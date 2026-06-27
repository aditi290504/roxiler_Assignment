import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminDashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Stores from "../pages/Admin/Stores";

import UserDashboard from "../pages/User/Dashboard";
import OwnerDashboard from "../pages/Owner/Dashboard";

import ProtectedRoute from "../components/ProetectedRoute";

function AppRoutes() {
    return (
        <Routes>

            {/* Public Routes */}

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Admin Routes */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute role="ADMIN">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute role="ADMIN">
                        <Users />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/stores"
                element={
                    <ProtectedRoute role="ADMIN">
                        <Stores />
                    </ProtectedRoute>
                }
            />

            {/* User Routes */}

            <Route
                path="/user/dashboard"
                element={
                    <ProtectedRoute role="USER">
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Store Owner Routes */}

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