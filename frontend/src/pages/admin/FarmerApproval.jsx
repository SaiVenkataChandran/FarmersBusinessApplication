import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './FarmerApproval.module.css';

const FarmerApproval = () => {
    const [farmers, setFarmers] = useState([]);
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: ''
    });

    useEffect(() => {
        fetchFarmers();
    }, []);

    const fetchFarmers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/farmers_fetching/admin");
            console.log(res.data)
            const data = Array.isArray(res.data) ? res.data : [];
            setFarmers(data);
        } catch (err) {
            console.log('Error fetching farmers:', err);
            showNotification('Failed to load farmers', 'error');
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/farmers/${id}/approve`);
            const updated = farmers.map(f => f.id === id ? { ...f, status: 'Approved' } : f);
            setFarmers(updated);
            const f = updated.find(f => f.id === id);
            showNotification(`${f.name} has been approved`, 'success');
        } catch (err) {
            showNotification('Approval failed', 'error');
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/farmers/${id}/reject`);
            const updated = farmers.map(f => f.id === id ? { ...f, status: 'Rejected' } : f);
            setFarmers(updated);
            const f = updated.find(f => f.id === id);
            showNotification(`${f.name} has been rejected`, 'error');
        } catch (err) {
            showNotification('Rejection failed', 'error');
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const renderRows = () => {
        const rows = [];
        for (let i = 0; i < farmers.length; i++) {
            const f = farmers[i];
            rows.push(
                <tr key={f.id}>
                    <td className={styles.farmerName}>{f.name}</td>
                    <td>{f.products}</td>
                    <td>
                        <span className={`${styles.status} ${styles[f.status.toLowerCase()]}`}>
                            {f.status}
                        </span>
                    </td>
                    <td>
                        {f.status === 'Pending' ? (
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleApprove(f.id)} className={styles.approveButton}>
                                    Approve
                                </button>
                                <button onClick={() => handleReject(f.id)} className={styles.rejectButton}>
                                    Reject
                                </button>
                            </div>
                        ) : (
                            <span className={styles.actionCompleted}>{f.status}</span>
                        )}
                    </td>
                </tr>
            );
        }
        return rows;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Farmer Approval</h1>

            {notification.show && (
                <div className={`${styles.notification} ${styles[notification.type]}`}>
                    {notification.message}
                </div>
            )}

            <div className={styles.tableContainer}>
                <table className={styles.farmerTable}>
                    <thead>
                        <tr>
                            <th>Farmer</th>
                            <th>Products</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{renderRows()}</tbody>
                </table>
            </div>
        </div>
    );
};

export default FarmerApproval;
