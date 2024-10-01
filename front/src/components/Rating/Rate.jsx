import { useState } from "react";

const Rate = ({ maxRating = 5, setRating }) => {
  const [hover, setHover] = useState(0);
  const [rating, setRatingLocal] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    setRatingLocal(value);
    setHover(value);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        ¿Cómo valorarías la experiencia?
      </h2>
      <div className="flex space-x-2">
        {[...Array(maxRating)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <div
              key={index}
              className={`relative w-8 h-8 rounded-full border-2 cursor-pointer ${
                ratingValue <= (hover || rating)
                  ? "bg-green-600 border-green-600"
                  : "bg-white border-green-600"
              }`}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => handleRating(ratingValue)}
              title={`Calificación ${ratingValue}`}
            >
              {ratingValue <= hover && (
                <div className="absolute top-0 left-0 w-full h-full bg-green-600 rounded-full opacity-50"></div>
              )}
            </div>
          );
        })}
        <p className="text-lg text-gray-600">
          {rating > 0
            ? ` ${
                rating === 1
                  ? "Pésimo"
                  : rating === 2
                  ? "Malo"
                  : rating === 3
                  ? "Normal"
                  : rating === 4
                  ? "Muy bueno"
                  : "Excelente"
              }`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Rate;
