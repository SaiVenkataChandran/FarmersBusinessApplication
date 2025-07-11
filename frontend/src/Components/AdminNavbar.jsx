// AdminNavbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminNavbar.module.css"; // Import the CSS module

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Optional: Clear any tokens/sessions here
        navigate("/admin-login"); // Redirect to login page
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Admin Panel</div>
            <ul className={styles.navLinks}>
                <li><Link to="/admin-dashboard/registrations">Farmer Approval</Link></li>
                <li><Link to="/admin-dashboard/products">Products Approval</Link></li>
                <li><Link to="/admin-dashboard/orders">Orders</Link></li>
                {/* <li><Link to="/admin-dashboard">Dashboard</Link></li> */}
                <li><Link to="/admin-dashboard/transactions">Transactions</Link></li>

            </ul>
            <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default AdminNavbar;