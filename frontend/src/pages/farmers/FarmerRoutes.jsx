// // src/pages/farmers/FarmerRoutes.jsx
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import FarmerHome from "./FarmerHome";
// import Products from "./Products";
// import AddProduct from "./AddProduct";
// import Notifications from "./Notifications";
// import Profile from "./Profile";
// import OrdersPage from "./OrdersPage";
// import FinDashboard from "./FinDashboard";  
// import Logout from "./Logout";

// const FarmerRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/farmer-home" element={<FarmerHome />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/add-product" element={<AddProduct />} />
//             <Route path="/notifications" element={<Notifications />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/orders" element={<OrdersPage />} />
//             <Route path="/financial-dashboard" element={<FinDashboard />} />
//             <Route path="/" element={<Logout />} />
//             {/* Add more routes as needed */}
//         </Routes>
//     );
// };

// export default FarmerRoutes;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FarmerHome from "./FarmerHome";
import Products from "./Products";
import AddProduct from "./AddProduct";
import Notifications from "./Notifications";
import Profile from "./Profile";
import OrdersPage from "./OrdersPage";
import FinDashboard from "./FinDashboard";
import Logout from "./Logout";

const FarmerRoutes = () => {
    const isLoggedIn = !!localStorage.getItem("farmerId");
    if (!isLoggedIn) return <Navigate to="/farmer-login" />;

    return (
        <Routes>
            <Route path="/farmer-home" element={<FarmerHome />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/financial-dashboard" element={<FinDashboard />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
};

export default FarmerRoutes;