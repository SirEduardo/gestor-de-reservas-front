import { Trash2 } from "lucide-react";

const RestaurantInfo = ({ restaurant, onDelete }) => {
  return (
    <div className="space-y-8">
      <button
        onClick={() => onDelete(restaurant._id)}
        className="flex items-center gap-1 text-red-500 hover:text-red-700"
      >
        Eliminar <Trash2 className="w-4 h-4" />
      </button>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={restaurant.img}
              alt={`${restaurant.name} image`}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {restaurant.category}
            </div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
              {restaurant.name}
            </h2>
            <p className="mt-2 text-gray-500">
              Horario: {restaurant.opening}H - {restaurant.closing}H
            </p>
            <p className="mt-2 text-gray-500">{restaurant.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
