import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, isFoodLoading, searchResults, isSearchLoading } =
    useContext(StoreContext);
  const foods = searchResults ?? food_list;
  const isLoading = isFoodLoading || isSearchLoading;
  const visibleFoods =
    searchResults !== null
      ? foods
      : foods.filter(
          (item) => category === "All" || category === item.category,
        );

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {isLoading ? (
        <div className="food-loading" role="status" aria-label="Loading menu">
          <span className="food-loading-spinner" />
          <p>Loading menu...</p>
        </div>
      ) : visibleFoods.length === 0 ? (
        <div className="food-empty" role="status">
          <p>No matching dishes found.</p>
        </div>
      ) : (
        <div className="food-display-list">
          {visibleFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
