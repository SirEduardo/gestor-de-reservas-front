import { useState } from "react";
import { Header } from "../../Header/Header";
import Rate from "../../Rating/Rate";
import { API_URL } from "../../../utils/Functions/api/api";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../utils/Hooks/fetch";
import Loading from "../../Loading/Loading";

const Comments = () => {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const { loading, postData } = useFetch();
  const navigate = useNavigate();

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

    const response = await postData(`${API_URL}/comments/${id}`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Comment posted successfully:", response);
    setInput("");
    setRating(0);
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-md mt-20 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-bold mb-1">
            Tu opinión
          </div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            Cuéntanos tu experiencia
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <Rate setRating={setRating} />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="review"
              >
                Tu opinión
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="review"
                rows={4}
                placeholder="Escribe tu experiencia aquí"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Enviar comentario
              </button>
            </div>
          </form>
          {loading && <Loading color="text-white" message="Cargando..." />}
          {!loading && error && (
            <p className="text-red-500 text-xs italic mt-3">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
