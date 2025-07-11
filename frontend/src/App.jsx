import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConsumerLogin from "./pages/consumers/ConsumerLogin.jsx";
import ConsumerReg from "./pages/consumers/ConsumerReg.jsx";
import FarmerLogin from "./pages/farmers/FarmerLogin.jsx";
import FarmerReg from "./pages/farmers/FarmerReg.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Home from "./pages/Home.jsx";
import AdminRoutes from "./pages/admin/AdminRoutes.jsx";
import FarmerRoutes from "./pages/farmers/FarmerRoutes.jsx";
import Unauthorized from "./pages/admin/Unauthorized.jsx";
import ConsumerDashboard from "./pages/consumers/ConsumerDashboard.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consumer-login" element={<ConsumerLogin />} />
        <Route path="/consumer-register" element={<ConsumerReg />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/farmer-register" element={<FarmerReg />} />
        <Route path="/admin/:id" element={<AdminLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
        <Route path="/consumer/*" element={<ConsumerDashboard />} />
        <Route path="/*" element={<FarmerRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;