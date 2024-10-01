import { useState } from "react";
import { Header } from "../../components/Header/Header";
import Rate from "../../components/Rating/Rate";
import axios from "axios";
import { API_URL } from "../../utils/Functions/api/api";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input || rating === 0) {
      setError("Por favor, proporciona un comentario y una calificación.");
      return;
    }
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    const commentData = {
      user: userId,
      restaurant: id,
      text: input,
      rating: rating,
    };
    console.log(commentData);

    try {
      const response = await axios.post(
        `${API_URL}/comments/${id}`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuesta del servidor:", response);

      console.log("Comment posted successfully:", response.data);
      setInput("");
      setRating(0);
      setError(null);
    } catch (error) {
      console.error("Error posting comment:", error.response.data);
      setError("Error en la respuesta del servidor.");
    }
  };

  return (
    <div>
      <Header />
      <main className="flex flex-col gap-20">
        <Rate setRating={setRating} />
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-bold">Escribe tu opinión</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4 h-32 w-1/3 p-3"
          >
            <textarea
              className="border border-gray-300 rounded-md shadow-md focus:border-blue-500 max-h-96"
              type="text"
              placeholder="Cuéntanos tu experiencia"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Enviar comentario
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default Comments;
