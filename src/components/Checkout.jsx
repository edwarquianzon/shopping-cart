import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePay = () => {
    alert("Payment successful!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      {cart.length > 0 ? (
        <>
          <div className="checkout-summary">
            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <div className="checkout-info">
                  <h2>{item.title}</h2>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="checkout-image"
                />
              </div>
            ))}
          </div>
          <h3 className="checkout-total">Total: ${totalAmount.toFixed(2)}</h3>
          <div className="button-group">
            <button className="back-button" onClick={() => navigate("/cart")}>
              Cancel
            </button>
            <button className="checkout-button" onClick={handlePay}>
              Pay
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;
