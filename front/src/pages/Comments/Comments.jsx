import { useState } from "react";
import { Header } from "../../components/Header/Header";
import Rate from "../../components/Rating/Rate";
import { postComments } from "../../utils/Functions/PostComments";

const Comments = ({ restaurantId, token }) => {
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!input || rating === 0) {
      setError("Please provide both a comment and a rating.");
      return;
    }

    try {
      const commentData = {
        text: input,
        rating: rating,
      };

      const response = await postComments(restaurantId, token, commentData);
      const res = await response.json();

      if (response.ok) {
        console.log("Comment posted successfully:", res);
        setInput("");
        setRating(0);
        setError(null);
      } else {
        setError(res.message || "Failed to post comment.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("An error occurred while posting the comment.");
    }
  };

  return (
    <div>
      <Header />
      <main className="flex flex-col gap-20">
        <Rate setRating={setRating} />
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-bold">Escribe tu opinión</h1>
          <textarea
            className="border border-gray-300 rounded-md shadow-md focus:border-blue-500 max-h-96 h-32 w-1/3 p-3"
            type="text"
            placeholder="Cuéntanos tu experiencia"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default Comments;
