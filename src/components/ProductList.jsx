import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification("Added to cart successfully!");
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="product-list-header">
        <input
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {notification && <div className="notification">{notification}</div>}

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      <button
        onClick={() => navigate("/cart")}
        className="floating-cart-button"
      >
        View Cart
      </button>
    </div>
  );
};

export default ProductList;
