import React, { useState, useEffect } from "react";
import styles from "./AddProduct.module.css";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddProduct = ({ product = null, onClose }) => {
  const farmerId = localStorage.getItem("farmerId");

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    contact: "",
    image: "",
    imagePath: "", // ✅ store Firebase path
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setNewProduct({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || "",
        quantity: product.stock ? parseInt(product.stock.split(" ")[0]) : "",
        contact: product.contact || "",
        image: product.image || "",
        imagePath: product.imagePath || "",
      });
      setImagePreview(product.image || null);
    } else {
      setNewProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
        contact: "",
        image: "",
        imagePath: "",
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const path = `product_images/${Date.now()}_${file.name}`; // ✅ Use string template
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        alert("Image upload failed");
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setNewProduct((prev) => ({
            ...prev,
            image: downloadURL,
            imagePath: path, // ✅ Save path for deletion later
          }));
          setImagePreview(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, quantity, contact, category, description, image } = newProduct;

    if (!name || !price || !quantity || !contact || !category || !description || !image) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const requestOptions = {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newProduct, farmerId }),
      };

      const endpoint = product
        ? `http://localhost:5000/api/products/${product._id}`
        : "http://localhost:5000/api/addproduct";

      const response = await fetch(endpoint, requestOptions);
      const result = await response.json();

      if (response.ok) {
        alert(product ? "Product updated successfully!" : "Product added successfully!");
        if (onClose) onClose();
      } else {
        alert(result.message || "Error saving product");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to save product");
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.addProductForm}>
        <h2>{product ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Product Name</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <select name="category" value={newProduct.category} onChange={handleInputChange} required>
              <option value="">-- Select Category --</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" value={newProduct.description} onChange={handleInputChange} required />
          </div>

          <div className={styles.formGroup}>
            <label>Upload Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && <p>Uploading image...</p>}
            {imagePreview && <img src={imagePreview} alt="Preview" className={styles.previewImage} />}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Price per Unit (₹)</label>
              <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required />
            </div>
            <div className={styles.formGroup}>
              <label>Quantity Available</label>
              <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Contact Info</label>
            <input type="text" name="contact" value={newProduct.contact} onChange={handleInputChange} required />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn} disabled={uploading}>
              {uploading ? "Uploading..." : product ? "Update" : "Submit"}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
