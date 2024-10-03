import Rating from "../../Rating/Rating";

const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Cards = ({
  id,
  img,
  name,
  average_rating,
  rating_number,
  category,
  location,
  opening,
  closing,
}) => {
  return (
    <div
      className="relative flex flex-col bg-slate-300 gap-3 rounded-xl cursor-pointer "
      key={id}
    >
      <img
        className="w-full h-56 object-cover rounded-t-xl"
        src={img}
        alt={name}
      ></img>
      <div className=" flex flex-col gap-2 p-3">
        <h2 className="font-bold">{capitalize(name)}</h2>
        <p>
          <Rating
            average_rating={average_rating}
            rating_number={rating_number}
          />
        </p>
        <p>{capitalize(category)}</p>
        <p>{capitalize(location)}</p>
        <p>
          Horario: {opening} - {closing}
        </p>
      </div>
    </div>
  );
};

export default Cards;
