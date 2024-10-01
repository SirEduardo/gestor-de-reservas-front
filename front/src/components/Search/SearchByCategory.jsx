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
    <div>
      <select
        className="rounded-full border-solid border px-4 py-2"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchByCategory;
