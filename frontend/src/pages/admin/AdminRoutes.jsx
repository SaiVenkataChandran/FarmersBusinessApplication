import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; // Your admin dashboard
import AdminLogin from "./AdminLogin"; // Your admin login page
import AdminNavbar from '../../Components/AdminNavbar';
import AdminProductApproval from "./AdminProductApproval";
import FarmerApproval from "./FarmerApproval";
import Orders from "./Orders";
import Transactions from "./Transactions";

const AdminRoutes = () => {
    return (
        <>
            <AdminNavbar /> {/* Always show AdminNavbar for admin pages */}
            <Routes>
                <Route path="/admin-login/:id" element={<AdminLogin />} />
                <Route path=" " element={<AdminDashboard />} />
                <Route path="products" element={<AdminProductApproval />} />
                <Route path="registrations" element={<FarmerApproval />} />
                <Route path="orders" element={<Orders />} />
                <Route path="transactions" element={<Transactions />} />
                {/* You can add more admin routes here */}
                <Route path="/admin" element={<Navigate to="/admin-login" />} />
            </Routes>
        </>
    );
};

export default AdminRoutes;