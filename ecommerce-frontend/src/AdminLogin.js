import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Reuse styling

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // You can replace this with a backend request
    if (email === "admin@medicart.com" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      setMessage("Invalid admin credentials.");
    }
  };

  return (
    <div className="container">
      <h1 className="brand">MediCart</h1>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login as Admin</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
}

export default AdminLogin;
