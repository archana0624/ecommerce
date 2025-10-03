import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost/ecommerce-backend/getProducts.php")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          alert("Invalid product format.");
        }
      })
      .catch(() => alert("Failed to fetch products"));
  }, []);

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to add products to your cart.");
      return;
    }

    const userCartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    // Check if product already exists
    const existingIndex = cart.findIndex(item => item.product_id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        product_id: product.id,
        product_name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem(userCartKey, JSON.stringify(cart));

   
    alert("Medicine added to your cart!");
  };

  return (
    <div className="products-container">
      <input
        type="text"
        placeholder="Search by medicine name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="product-search-input"
      />

      <div className="products-grid">
  {products && products.length > 0 ? (
    products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((product, index) => (
        <div className="product-card" key={index}>
          <img
            src={`http://localhost/ecommerce-backend/uploads/${product.image}`}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p><strong>₹{product.price}</strong></p>
          <p>{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              backgroundColor: "#425c77",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={() =>
              navigate("/buy-now", { state: { product } })
            }
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              backgroundColor: "#ee9f27",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Buy Now
          </button>
        </div>
      ))
  ) : (
    <p>No products available.</p>
  )}
</div>

    </div>
  );
}

export default Products;
