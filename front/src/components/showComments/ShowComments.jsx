import axios from "axios";
import { API_URL } from "../../utils/Functions/api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "../Rating/Rating";

const ShowComments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_URL}/comments/${id}`);
        const res = response.data;
        setComments(res);
        console.log(res);
      } catch (error) {
        console.error("Error recogiendo comentarios", error);
      }
    };

    if (id) {
      fetchComments();
    }
  }, [id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Comentarios</h2>
      {Array.isArray(comments) && comments.length > 0 ? (
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
                      {comment.user?.userName || "Usuario desconocido"}
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
