import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        users: 0,
        stores: 0,
        ratings: 0
    });

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const res = await api.get("/admin/dashboard");

            setStats(res.data.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">
                Admin Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Users</h5>

                            <h1>{stats.users}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Stores</h5>

                            <h1>{stats.stores}</h1>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Ratings</h5>

                            <h1>{stats.ratings}</h1>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default Dashboard;