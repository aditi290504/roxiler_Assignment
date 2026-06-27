import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {

            const res = await api.get("/admin/users");

            setUsers(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <AdminLayout>

            <h2 className="mb-4">
                Users Management
            </h2>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Address</th>

                        <th>Role</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.address}</td>

                                <td>{user.role}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </AdminLayout>

    );

}

export default Users;