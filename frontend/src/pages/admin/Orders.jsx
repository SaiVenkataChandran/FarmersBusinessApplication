import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Orders.module.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/admin/orders', {
                    params: { status: statusFilter !== 'All' ? statusFilter : undefined }
                });
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [statusFilter]);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/orders/${orderId}`, {
                status: newStatus
            });

            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, orderStatus: response.data.orderStatus } : order
            ));

            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder(prev => ({ ...prev, orderStatus: response.data.orderStatus }));
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Orders Management</h1>

            <div className={styles.filterSection}>
                <label>Filter by Status:</label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="All">All Orders</option>
                    <option value="Ordered">Ordered</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={styles.ordersGrid}>
                    <div className={styles.ordersList}>
                        <table className={styles.ordersTable}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr
                                        key={order._id}
                                        onClick={() => setSelectedOrder(order)}
                                        className={`${styles.orderRow} ${selectedOrder?.id === order._id ? styles.selected : ''}`}
                                    >
                                        <td>{order.orderId}</td>
                                        <td>{order.consumerId}</td>
                                        <td>{new Date(order.orderedAt).toLocaleString()}</td>
                                        <td>₹{order.amount.toFixed(2)}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[order.orderStatus.toLowerCase()]}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {selectedOrder && (
                        <div className={styles.orderDetails}>
                            <h2>Order Details</h2>
                            <div className={styles.detailSection}>
                                <h3>Order {selectedOrder.orderId}</h3>
                                <p><strong>Customer ID:</strong> {selectedOrder.consumerId}</p>
                                <p><strong>Date:</strong> {new Date(selectedOrder.orderedAt).toLocaleString()}</p>
                                <p><strong>Status:</strong>
                                    <select
                                        value={selectedOrder.orderStatus}
                                        onChange={(e) => updateOrderStatus(selectedOrder._id, e.target.value)}
                                        className={styles.statusSelect}
                                    >
                                        <option value="Ordered">Ordered</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </p>
                            </div>

                            <div className={styles.detailSection}>
                                <h3>Items</h3>
                                <table className={styles.itemsTable}>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedOrder.cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>₹{item.price.toFixed(2)}</td>
                                                <td>{item.quantity}</td>
                                                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className={styles.totalAmount}>
                                    <strong>Total: ₹{selectedOrder.amount.toFixed(2)}</strong>
                                </div>
                            </div>

                            <div className={styles.detailSection}>
                                <h3>Payment Method</h3>
                                <p>{selectedOrder.Payment_type}</p>
                                <h3>Payment ID</h3>
                                <p>{selectedOrder.paymentId}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Orders;
