import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import axios from "axios";
import styles from "./Product.module.css";
import Navbar from "../../Components/Navbar";
import AddProduct from "./AddProduct";
import { storage } from "../../firebaseConfig.js";
import { ref, deleteObject } from "firebase/storage";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");

  const farmerId = localStorage.getItem("farmerId");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/products", { farmerId });
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error("Fetch error:", err);
    }
  };

  const handleSaveProduct = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      // 1. Get imagePath (NOT imageUrl)
      const imageRes = await axios.get(`http://localhost:5000/api/products/image/${id}`);
      const imagePath = imageRes.data.imagePath;

      // 2. Delete from Firebase Storage
      if (imagePath) {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
        console.log("Image deleted from Firebase Storage");
      }

      // 3. Delete product from database
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className={styles.productsContainer}>
      <Navbar />
      <h2>Product List</h2>

      {error && <p className={styles.error}>{error}</p>}

      <button
        className={styles.addProductBtn}
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        Add Product
      </button>

      {showForm && (
        <AddProduct
          farmerId={farmerId}
          onClose={handleSaveProduct}
          product={editingProduct}
        />
      )}

      {products.length === 0 ? (
        <p className={styles.noProducts}>No products found.</p>
      ) : (
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div className={styles.productCard} key={product._id}>
              <img
                src={product.image || "/assets/default.jpg"}
                alt={product.name}
                className={styles.productImage}
              />
              <h3>{product.name}</h3>
              <p className={styles.price}>Price: <span>₹{product.price}</span></p>
              <p className={styles.price}>Available stock: <span>{product.quantity}</span></p>
              <p className={styles.price}>Product status: <span>{product.isVerified}</span></p>
              <p className={styles.price}>Product Id: <span>{product.productId}</span></p>
              <p className={styles.price}>Uploaded at: <span>{format(product.updatedAt)}</span></p>
              <div className={styles.productActions}>
                <button className={styles.editBtn} onClick={() => handleEdit(product)}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
