import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, isFoodLoading } = useContext(StoreContext);
  
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {isFoodLoading ? (
        <div className="food-loading" role="status" aria-label="Loading menu">
          <span className="food-loading-spinner" />
          <p>Loading menu...</p>
        </div>
      ) : (
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
