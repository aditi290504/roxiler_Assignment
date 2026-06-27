import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminDashboard from "../pages/Admin/Dashboard";
import UserDashboard from "../pages/User/Dashboard";
import OwnerDashboard from "../pages/Owner/Dashboard";
import ProtectedRoute from "../components/ProectedRoute";

function AppRoutes() {

    return (
        <Routes>

            <Route path="/" element={<Login />} />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
    path="/admin/dashboard"
    element={
        <ProtectedRoute role="ADMIN">
            <AdminDashboard />
        </ProtectedRoute>
    }
/>

            <Route
    path="/user/dashboard"
    element={
        <ProtectedRoute role="USER">
            <UserDashboard />
        </ProtectedRoute>
    }
/>
<Route
                path="/user/dashboard"
                element={<UserDashboard />}
            />

            <Route
    path="/owner/dashboard"
    element={
        <ProtectedRoute role="OWNER">
            <OwnerDashboard />
        </ProtectedRoute>
    }
/>

        </Routes>
    );

}

export default AppRoutes;