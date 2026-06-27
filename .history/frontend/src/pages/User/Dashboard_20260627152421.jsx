function Dashboard() {
    return <h1>User Dashboard</h1>;
}

export default Dashboard;

import AdminLayout from "../../layouts/AdminLayout";
import UserLayout from "../../layouts/UserLayout";

function Dashboard() {

    return (

        <UserLayout>

            <h2>Admin Dashboard</h2>

        </AdminLayout>

    );

}

export default Dashboard;