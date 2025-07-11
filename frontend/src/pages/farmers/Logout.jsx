// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineLogout } from "react-icons/ai";
// import styles from "./Logout.module.css";

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       if (res.ok) {
//         localStorage.removeItem("token");
//         navigate("/");
//       } else {
//         alert("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <button className={styles.logoutBtn} onClick={handleLogout}>
//       <AiOutlineLogout /> Logout
//     </button>
//   );
// };

// export default Logout;
// src/pages/farmers/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                // Optional: Call backend to clear cookies/session if needed
                await fetch("http://localhost:5000/logout", {
                    method: "POST",
                    credentials: "include",
                });
            } catch (error) {
                console.error("Logout error:", error);
            }

            // Remove local storage and redirect
            localStorage.removeItem("farmerId");
            navigate("/farmer-login");
        };

        logoutUser();
    }, [navigate]);

    return null; // You don't need a button here since it auto-executes on route
};

export default Logout;