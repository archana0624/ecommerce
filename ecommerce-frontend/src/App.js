import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Products from "./Products";
import Admin from "./Admin1";
import AdminLogin from "./AdminLogin";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import "./Navbar.css"; 
import BuyNowForm from "./BuyNowForm";
import MyOrders from "./MyOrders";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  const userInitial =
    user && user.name && typeof user.name === "string"
      ? user.name.charAt(0).toUpperCase()
      : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="brand-title">MediCart</h2>
      </div>

      <div className="nav-links">
        <Link to="/products" className="nav-button">Medicines</Link>
        <Link to="/admin-login" className="nav-button">Admin</Link>

        {user && (
          <Link to="/orders" className="nav-button">Orders</Link>
        )}

        <Link to="/cart" className="nav-button cart-button">Prescription Cart</Link>

        {userInitial ? (
          <div
            className="user-dropdown"
            onMouseEnter={() => document.getElementById("dropdown").style.display = "block"}
            onMouseLeave={() => document.getElementById("dropdown").style.display = "none"}
          >
            <div className="user-initial">{userInitial}</div>
            <div className="dropdown-menu" id="dropdown">
              <p>Hello, {user.name.split(" ")[0]}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="nav-button">Login</Link>
        )}
      </div>
    </nav>
  );
}



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy-now" element={<BuyNowForm />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
