import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost/ecommerce-backend/login.php"
      : "http://localhost/ecommerce-backend/signup.php";

    try {
      const res = await axios.post(url, JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === "success") {
        let userData;

        if (isLogin) {
          // Login must return user object from backend
          userData = res.data.user;

          // Fallback: if backend doesn't send `user`, create it from form
          if (!userData || !userData.email) {
            userData = {
              name: form.name || "User",
              email: form.email,
            };
          }
        } else {
          // Signup: use form data
          userData = { name: form.name, email: form.email };
        }

        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/products");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };
  const backgroundStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/background.jpg')", // 🔹 your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={backgroundStyle}>
    <div className="container">
      <h1 className="brand">MediCart</h1>
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle">
          {isLogin ? "Don't have an account? Signup" : "Already a user? Login"}
        </p>
      </form>
      <p className="message">{message}</p>
    </div></div>
  );
}

export default LoginPage;
