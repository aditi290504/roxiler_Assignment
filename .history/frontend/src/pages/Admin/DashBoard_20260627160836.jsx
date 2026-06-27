import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const res = await api.get("/admin/dashboard");

            setStats({
                totalUsers: res.data.totalUsers,
                totalStores: res.data.totalStores,
                totalRatings: res.data.totalRatings
            });

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AdminLayout>

            <h2 className="mb-4">Dashboard</h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card shadow border-0">

                        <div className="card-body text-center">

                            <h5>Total Users</h5>

                            <h1>{stats.totalUsers}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0">

                        <div className="card-body text-center">

                            <h5>Total Stores</h5>

                            <h1>{stats.totalStores}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0">

                        <div className="card-body text-center">

                            <h5>Total Ratings</h5>

                            <h1>{stats.totalRatings}</h1>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}

export default Dashboard;