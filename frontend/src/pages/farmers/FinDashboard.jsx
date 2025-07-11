import React, { useEffect, useState } from "react";
import styles from "./FinDashboard.module.css";
import Navbar from "../../Components/Navbar";
import axios from "axios";

const FinDashboard = () => {
  const farmerId = localStorage.getItem("farmerId");

  const [data, setData] = useState({
    totalRevenue: 0,
    netProfit: 0,
    balance: 0,
    monthlyEarnings: new Array(12).fill(0),
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/financedashboardfarm/${farmerId}`);
        setData(res.data);
        console.log("Finance Data:", res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, [farmerId]);

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <header className={styles.dashboardHeader}></header>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={`${styles.card} ${styles.revenue}`}>
          Total Revenue <span>₹{data.totalRevenue?.toLocaleString() || 0}</span>
        </div>
        <div className={`${styles.card} ${styles.profit}`}>
          Net Profit <span>₹{data.netProfit?.toLocaleString() || 0}</span>
        </div>
        <div className={`${styles.card} ${styles.balance}`}>
          Balance <span>₹{data.balance?.toLocaleString() || 0}</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h2>Monthly Earnings</h2>
          <div className={styles.barChart}>
            {data.monthlyEarnings.map((value, i) => (
              <div key={i} className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ height: `${(value / 20000) * 160}px` }}
                ></div>
                <span className={styles.barLabel}>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={styles.transactionsSection}>
        <h2>Recent Transactions</h2>
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.recentTransactions.slice(0, 5).map((tx, i) => {
              const amount = Math.abs(parseFloat(tx.amount?.replace(/[^\d.-]/g, ""))) || 0;

              return (
                <tr key={i}>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.description}</td>
                  <td className={styles.positive}>
                    ₹{amount.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinDashboard;
