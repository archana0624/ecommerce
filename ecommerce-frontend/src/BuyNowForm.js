// src/BuyNowForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./BuyNowForm.css";

function BuyNowForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const product = state?.product;

  const [form, setForm] = useState({
    email: user?.email || "",
    name: "",
    phone: "",
    address: "",
    quantity: 1,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!product || !product.id) {
      alert("❌ Product information is missing.");
      return;
    }

    const amount = parseFloat(product.price) * parseInt(form.quantity);

    const options = {
      key: "rzp_test_wMVf0tXcdNr4o3", // ✅ Replace this
      amount: amount * 100, // in paise
      currency: "INR",
      name: "BuyNest",
      description: `Payment for ${product.name}`,
      image: "/logo.png", // optional
      handler: async function (response) {
        // Payment succeeded, now place order in backend
        const payload = {
          email: form.email,
          customer_name: form.name,
          mobile: form.phone,
          address: form.address,
          product_id: product.id,
          product_name: product.name,
          image: product.image,
          price: product.price,
          quantity: parseInt(form.quantity),
        };

        try {
          const res = await axios.post(
            "http://localhost/ecommerce-backend/placeOrder.php",
            JSON.stringify(payload),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.data.status === "success") {
            alert("✅ Payment & Order successful!");
            navigate("/products");
          } else {
            alert("❌ Order failed: " + res.data.message);
          }
        } catch (err) {
          console.error("Error placing order", err);
          alert("❌ Server error. Try again later.");
        }
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#007bff",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!user || !product) return <p>Invalid session. Please login again.</p>;

  return (
    <div className="container">
      <h2>Buy Now: {product.name}</h2>
      <form onSubmit={handlePayment}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
        ></textarea>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </label>
        <h4 style={{ marginTop: "15px" }}>
          Total Amount: ₹{(product.price * form.quantity).toFixed(2)}
        </h4>
        <button type="submit">Pay & Place Order</button>
      </form>
    </div>
  );
}

export default BuyNowForm;
