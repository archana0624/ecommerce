import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

function Admin1() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLoggedIn");
    if (!isAdmin) navigate("/admin-login");

    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };

    preventGoBack();
    window.addEventListener("popstate", preventGoBack);
    fetchProducts();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, [navigate]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost/ecommerce-backend/getProducts.php");
    setProducts(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) formData.append(key, form[key]);
    if (editingId) formData.append("id", editingId);

    const url = editingId
      ? "http://localhost/ecommerce-backend/updateProduct.php"
      : "http://localhost/ecommerce-backend/addProduct.php";

    try {
      const res = await axios.post(url, formData);
      if (res.data.status === "success") {
        setMessage(editingId ? "Product updated" : "Product added");
        setForm({ name: "", price: "", description: "", image: null });
        setEditingId(null);
        fetchProducts();
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch {
      setMessage("❌ Server error");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;

    const res = await axios.post("http://localhost/ecommerce-backend/deleteProduct.php", { id });
    if (res.data.status === "success") {
      setMessage("Product deleted");
      fetchProducts();
    } else {
      setMessage("❌ Failed to delete");
    }
  };

  return (
    <div className="admin-container">
      <div className="section-box">
      <h2>{editingId ? "Update Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">{editingId ? "Update" : "Add Product"}</button>
        <div style={{ marginBottom: "30px" }}></div>
      </form>
      <p>{message}</p>
      </div>

      
      <h2>All Products</h2>
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Price</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((p) => (
              <tr key={p.id}>
                <td><img src={`http://localhost/ecommerce-backend/uploads/${p.image}`} alt="" width="60" /></td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.description}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Update</button>
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin1;
