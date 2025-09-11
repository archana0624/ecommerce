import React, { useEffect, useState } from "react";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Please login to view your cart.");
      return;
    }

    setUser(storedUser);
    const userCartKey = `cart_${storedUser.email}`;
    const storedCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    // Ensure all items have a quantity field (default 1)
    const cartWithQty = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    setCart(cartWithQty);
  }, []);

  const updateLocalStorage = (newCart) => {
    const userCartKey = `cart_${user.email}`;
    localStorage.setItem(userCartKey, JSON.stringify(newCart));
    setCart(newCart);
  };

  const changeQuantity = (index, delta) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    updateLocalStorage(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Remove one item at the specified index
    updateLocalStorage(updatedCart);
  };

  const clearCart = () => {
    const userCartKey = `cart_${user.email}`;
    localStorage.removeItem(userCartKey);
    setCart([]);
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="container">
      <h1 className="brand">Your Cart</h1>
      {!user ? (
        <p>Please log in to view your cart.</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div className="cart-item" key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ccc", padding: "15px 0" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={`http://localhost/ecommerce-backend/uploads/${item.image}`}
                  alt={item.name}
                  width="100"
                  height="100"
                  style={{ objectFit: "contain", marginRight: "20px" }}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p><strong>₹{item.price}</strong></p>
                  <p style={{ color: "#555", fontSize: "0.9rem" }}>{item.description}</p>

                  <div className="quantity-controls">
                    <button onClick={() => changeQuantity(index, -1)}>-</button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <button onClick={() => changeQuantity(index, 1)}>+</button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeItem(index)}
                style={{
                  padding: "6px 10px",
                  backgroundColor: "#ffffffff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ❎
              </button>
            </div>
          ))}
          <h3 style={{ marginTop: "20px" }}>Total Bill: ₹{total.toFixed(2)}</h3>
          <button
            onClick={clearCart}
            style={{
              marginTop: "20px",
              padding: "10px 16px",
              backgroundColor: "#e31433ff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
