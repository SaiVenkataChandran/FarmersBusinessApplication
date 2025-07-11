import React, { useState, useEffect } from 'react';
import styles from './Transactions.module.css';
import axios from 'axios';
import {
    FiSearch,
    FiCheckCircle,
    FiClock,
    FiXCircle
} from 'react-icons/fi';

const Transactions = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState('all');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch transactions from backend
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/admin-transactions');
            setTransactions(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch transactions", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // Filter based on search or date
    const filterByDateRange = (transactionDate) => {
        const txnDate = new Date(transactionDate);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        switch (dateRange) {
            case 'today':
                return txnDate >= today;
            case 'week':
                return txnDate >= startOfWeek;
            case 'month':
                return txnDate >= startOfMonth;
            default:
                return true;
        }
    };

    const filteredTransactions = transactions.filter(txn => {
        const matchesSearch =
            txn.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            txn.customerId.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDate = filterByDateRange(txn.date);

        return matchesSearch && matchesDate;
    });

    const getStatusIcon = () => {
        return <FiCheckCircle className={styles.successIcon} />; // All are confirmed based on backend
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Transaction History</h1>
                    <div className={styles.actions}>
                        <div className={styles.searchBar}>
                            <FiSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search by CustomerID"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className={styles.filterGroup}>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.transactionsTable}>
                    {loading ? (
                        <p>Loading transactions...</p>
                    ) : filteredTransactions.length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>Customer ID</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((txn, index) => (
                                    <tr key={index}>
                                        <td>{txn.transactionId}</td>
                                        <td>{txn.customerId}</td>
                                        <td>₹{txn.amount.toFixed(2)}</td>
                                        <td>{new Date(txn.date).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
