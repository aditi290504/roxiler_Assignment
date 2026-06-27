import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminDashboard from "../pages/Admin/Dashboard";
import UserDashboard from "../pages/User/Dashboard";
import OwnerDashboard from "../pages/Owner/Dashboard";

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
                element={<AdminDashboard />}
            />

            <Route
                path="/user/dashboard"
                element={<UserDashboard />}
            />

            <Route
                path="/owner/dashboard"
                element={<OwnerDashboard />}
            />

        </Routes>
    );

}

export default AppRoutes;