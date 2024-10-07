import { useState } from "react";

const SearchByCategory = ({ setRestaurants, restaurants, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      const filtered = restaurants.filter(
        (restaurant) => restaurant.category === category
      );
      setRestaurants(filtered);
    } else {
      setRestaurants(restaurants);
    }
  };
  return (
    <div className="relative w-full max-w-xs">
      <select
        className="w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 pr-8 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
        value={selectedCategory}
        onChange={handleCategoryChange}
        aria-label="Seleccionar categoría"
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchByCategory;
