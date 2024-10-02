const Rating = ({
  average_rating,
  rating_number,
  showFormattedRating = true,
  showRatingNumber = true,
}) => {
  const totalCircles = 5;

  const formattedRating = average_rating.toFixed(1);

  const circles = Array.from({ length: totalCircles }, (_, index) => {
    let isFilled = index < Math.floor(average_rating);
    let isHalfFilled =
      index === Math.floor(average_rating) && average_rating % 1 !== 0;

    return (
      <div
        key={index}
        className={`relative w-4 h-4 rounded-full border-2 ${
          isFilled
            ? "bg-green-500 border-green-500"
            : "bg-white border-gray-300"
        }`}
        title={isFilled ? "Filled" : isHalfFilled ? "Half Filled" : "Empty"}
        aria-label={
          isFilled ? "Filled" : isHalfFilled ? "Half Filled" : "Empty"
        }
      >
        {isHalfFilled && (
          <div className="absolute top-0 left-0 w-full h-full bg-green-500 rounded-full opacity-50"></div>
        )}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {showFormattedRating && (
          <div className="text-xl font-bold">{formattedRating}</div>
        )}
        <div className="flex items-center">{circles}</div>
      </div>
      {showRatingNumber && (
        <div className="text-base">{rating_number} opiniones</div>
      )}
    </div>
  );
};

export default Rating;
