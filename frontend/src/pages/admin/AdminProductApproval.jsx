import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminProductApproval.module.css';

const AdminProductApproval = () => {
    const [products, setProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/pending-products');
                if (response.data && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.log("Unexpected response format:", response.data);
                }
            } catch (error) {
                console.log("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleApprove = async (productId) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/products/verify/${productId}`, {
                status: "Approved"
            });
            if (response.status === 200) {
                alert(`Product ${productId} approved`);
                setProducts(products.filter(product => product.productId !== productId));
            } else {
                alert("Error approving product");
            }
        } catch (err) {
            console.log("Error approving product:", err);
            alert("Error approving product");
        }
    };

    const handleReject = async (productId) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/products/verify/${productId}`, {
                status: "Rejected"
            });
            if (response.status === 200) {
                alert(`Product ${productId} rejected`);
                setProducts(products.filter(product => product.productId !== productId));
            } else {
                alert("Error rejecting product");
            }
        } catch (err) {
            console.log("Error rejecting product:", err);
            alert("Error rejecting product");
        }
    };

    const filteredProducts = products.filter(product =>
        product.category.toLowerCase().includes(categoryFilter.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1>Product Approval</h1>

            <div className={styles.filterBar}>
                <label htmlFor="category">Filter:</label>
                <input
                    type="text"
                    placeholder="Category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className={styles.searchBox}
                />
            </div>

            <div className={styles.table}>
                <div className={styles.tableHeader}>
                    <span>Product Name</span>
                    <span>Product ID</span>
                    <span>Farmer ID</span>
                    <span>Price</span>
                    <span>Category</span>
                    <span>Action</span>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className={styles.noData}>No products found.</div>
                ) : (
                    filteredProducts.map(product => (
                        <div key={product.productId} className={styles.tableRow}>
                            <div className={styles.productDetails}>
                                <img src={product.image} alt={product.name} />
                                <div>
                                    <strong>{product.name}</strong>
                                </div>
                            </div>
                            <span>{product.productId}</span>
                            <span>{product.farmerId}</span>
                            <span className={styles.price}>₹{product.price}</span>
                            <span>{product.category}</span>
                            <div className={styles.actionButtons}>
                                <button className={styles.approve} onClick={() => handleApprove(product.productId)}>Approve</button>
                                <button className={styles.reject} onClick={() => handleReject(product.productId)}>Reject</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminProductApproval;
