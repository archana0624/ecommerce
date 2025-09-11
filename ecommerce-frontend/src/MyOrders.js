// src/MyOrders.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please login to view your orders.");
      return;
    }

    axios
      .get(`http://localhost/ecommerce-backend/getOrders.php?email=${user.email}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          alert("No orders found.");
        }
      })
      .catch(() => alert("Failed to fetch orders"));
  }, []);

  if (!user) return <p>Please login to view your orders.</p>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <img
              src={`http://localhost/ecommerce-backend/uploads/${order.image}`}
              alt={order.product_name}
              width="100"
            />
            <div>
              <h3>{order.product_name}</h3>
              <p><strong>Price:</strong> ₹{order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total:</strong> ₹{order.total_amount}</p>
              <p><strong>Delivery To:</strong> {order.customer_name}, {order.address}</p>
              <p><strong>Mobile:</strong> {order.mobile}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
