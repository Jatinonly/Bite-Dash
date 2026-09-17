import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-delivery-website-54qu.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [isFoodLoading, setIsFoodLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const applyPromoCode = (code) => {
    const normalizedCode = code.trim().toUpperCase();
    if (normalizedCode === "BITE10") {
      setPromoCode(normalizedCode);
      return true;
    }
    setPromoCode("");
    return false;
  };

  const getDiscountAmount = () =>
    promoCode === "BITE10" ? Math.round(getTotalCartAmount() * 0.1) : 0;

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    try {
      if (token) {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } },
        );
      }
      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Could not add item to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    try {
      if (token) {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } },
        );
      }
      toast.error("Item removed from cart");
    } catch (error) {
      toast.error("Could not remove item from cart");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } finally {
      setIsFoodLoading(false);
    }
  };

  const searchFood = useCallback(
    async (query) => {
      const normalizedQuery = query.trim();

      if (!normalizedQuery) {
        setSearchResults(null);
        return;
      }

      setIsSearchLoading(true);
      try {
        const response = await axios.get(
          `${url}/api/food/search?q=${encodeURIComponent(normalizedQuery)}`,
        );
        setSearchResults(response.data.success ? response.data.data : []);
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsSearchLoading(false);
      }
    },
    [url],
  );

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } },
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    isFoodLoading,
    searchResults,
    isSearchLoading,
    searchFood,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    promoCode,
    applyPromoCode,
    getDiscountAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
