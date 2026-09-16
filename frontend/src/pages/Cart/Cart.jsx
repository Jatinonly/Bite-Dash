import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    getDiscountAmount,
    applyPromoCode,
    promoCode,
    url,
  } = useContext(StoreContext);

  const [promoInput, setPromoInput] = React.useState("");
  const [promoMessage, setPromoMessage] = React.useState("");
  const [promoStatus, setPromoStatus] = React.useState("");

  const navigate = useNavigate();
  const subtotal = getTotalCartAmount();
  const discount = getDiscountAmount();
  const originalTotal = subtotal === 0 ? 0 : subtotal + 49;
  const finalTotal = subtotal === 0 ? 0 : subtotal - discount + 49;

  const handlePromoCode = () => {
    const applied = applyPromoCode(promoInput);
    setPromoMessage(applied ? "Promo code applied" : "Invalid promo code");
    setPromoStatus(applied ? "success" : "error");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 49}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>-₹{discount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <div className="cart-total-values">
                {discount > 0 && (
                  <span className="original-total">₹{originalTotal}</span>
                )}
                <b>₹{finalTotal}</b>
              </div>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value)}
                placeholder="Try BITE10 for 10% off"
                aria-label="Promo code"
              />
              <button type="button" onClick={handlePromoCode}>
                APPLY
              </button>
            </div>
            <small className={`promo-message ${promoStatus}`}>
              {promoMessage || (promoCode ? `${promoCode} applied` : "")}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
