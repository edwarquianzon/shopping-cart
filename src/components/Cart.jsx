import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart, updateCartQuantity, clearCart }) => {
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
    setNotification("Item removed from cart!");
    setNotificationType("error");
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleClearCart = () => {
    clearCart();
    setNotification("All items cleared from cart!");
    setNotificationType("error");
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="container">
      <h1>Cart</h1>
      {notification && (
        <div className={`notification ${notificationType}`}>{notification}</div>
      )}

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty</p>
          <button onClick={() => navigate("/")} className="back-button">
            Back
          </button>
        </>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h2>{item.title}</h2>
              <p>${item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <div className="button-group">
            <button onClick={() => navigate("/")} className="back-button">
              Back
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="checkout-button"
            >
              Proceed to Checkout
            </button>
            <button onClick={handleClearCart} className="clear-button">
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
