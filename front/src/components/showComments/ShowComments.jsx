import { API_URL } from "../../utils/Functions/api/api";
import { useEffect, useState } from "react";
import Rating from "../Rating/Rating";
import Loading from "../Loading/Loading";
import useFetch from "../../utils/Hooks/fetch";
import DeleteComments from "../../utils/Functions/Delete/DeleteComments";
import { Trash2 } from "lucide-react";

const ShowComments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { loading, fetchData } = useFetch();

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      try {
        const response = await fetchData(`${API_URL}/comments/${id}`);
        if (response) {
          setComments(response.comments);
        } else {
          setComments([]);
        }
      } catch (err) {
        setError("Error al cargar comentarios. Por favor intenta nuevamente.");
        console.error(err);
      }
    };

    fetchComments();
  }, [id]);

  const handleDelete = async (commentId) => {
    try {
      await DeleteComments(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.log("Error deleting comment", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-2xl font-bold mb-6">Comentarios</h2>
      {loading ? (
        <Loading message="Cargando comentarios..." />
      ) : !loading && error ? (
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">{error}</p>{" "}
        </div>
      ) : Array.isArray(comments) && comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
              key={comment._id}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">
                      {comment.user?.userName
                        ? comment.user.userName[0].toUpperCase()
                        : "?"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {`${comment.user?.userName} ${
                        comment.user?.lastName || ""
                      }`}
                    </h3>
                    <Rating
                      average_rating={comment.rating}
                      showFormattedRating={false}
                      showRatingNumber={false}
                    />
                    <p className="text-sm text-gray-500">
                      {new Date(comment.creation_date).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                {comment.user?._id === userId && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              <p className="text-gray-700 mt-2">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            No hay comentarios disponibles
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowComments;
