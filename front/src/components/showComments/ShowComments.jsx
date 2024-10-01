import axios from "axios";
import { API_URL } from "../../utils/Functions/api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="bg-white p-5 rounded-lg">
      {Array.isArray(comments) && comments.length > 0 ? (
        <div className="flex flex-col gap-5">
          {comments.map((comment) => (
            <div className=" border-b border-slate-200" key={comment._id}>
              <h3>{comment.user?.userName || "Usuario desconocido"}</h3>{" "}
              {/* Mostrar el nombre del usuario */}
              <div>Rating: {comment.rating}</div>{" "}
              <p>
                Fecha: {new Date(comment.creation_date).toLocaleDateString()}{" "}
              </p>
              <p>Comentario: {comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay comentarios disponibles</p>
      )}
    </div>
  );
};

export default ShowComments;
