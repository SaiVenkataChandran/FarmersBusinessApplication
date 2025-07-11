import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./OrdersPage.module.css";
import Navbar from "../../Components/Navbar";

const OrdersPage = () => {
    const [userRole, setUserRole] = useState(""); // Optional: "farmer" or "admin"
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/ordersfarms", {
                    params: {
                        farmerId: localStorage.getItem("farmerId"),
                    },
                });
                setOrders(res.data);
                console.log(orders)
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [userRole]);

    return (
        <div className="orderPage-background">
            <Navbar />
            <div className={styles["orderPage-container"]}>
                <h1 className={styles["orderPage-title"]}>
                    📦 My Orders ({userRole || "Farmer"})
                </h1>
                <div className={styles["orderPage-table"]}>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Quantity (kg)</th>
                                <th>Price</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.productName}</td>
                                        <td>{order.quantity}</td>
                                        <td>₹{order.price}</td>
                                        <td>{order.transactionId || "COD"}</td>
                                        <td>{order.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;

