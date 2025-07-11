import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineBell } from "react-icons/ai";
import "./Notifications.css";
import Navbar from "../../Components/Navbar";
import moment from "moment";

const Notifications = () => {
  const farmerId = localStorage.getItem("farmerId");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${farmerId}`);
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (farmerId) {
      fetchNotifications();
    }
  }, [farmerId]);

  return (
    <>
      <div className="notification-background">
        <Navbar />
        <div className="notifications-container">
          <h2 className="notifications-title">Notifications</h2>
          {notifications.map((notification) => (
            <div key={notification._id} className="notification-card">
              <AiOutlineBell className="notification-icon" />
              <div className="notification-text">
                <p className="notification-message">{notification.message}</p>
                <p className="notification-time">{moment(notification.createdAt).fromNow()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
