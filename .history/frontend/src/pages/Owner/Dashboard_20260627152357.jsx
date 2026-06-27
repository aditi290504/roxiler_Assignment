function Dashboard() {
    return <h1>Store Owner Dashboard</h1>;
}

export default Dashboard;

import AdminLayout from "../../layouts/AdminLayout";
import OwnerLayout from "../../layouts/OwnerLayout";

function Dashboard() {

    return (

        <OwnerLayout>

            <h2>Owner Dashboard</h2>

        </OwnerLayout>

    );

}

export default Dashboard;