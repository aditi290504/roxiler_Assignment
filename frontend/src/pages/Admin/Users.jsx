import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const res = await api.get("/admin/users", {
                params: {
                    search,
                    role
                }
            });

            setUsers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {
        fetchUsers();
    }, [search, role]);

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Users</h2>

                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addUserModal"
                >
                    Add User
                </button>

            </div>

            <div className="row mb-3">

                <div className="col-md-8">

                    <input
                        className="form-control"
                        placeholder="Search Name / Email / Address"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >

                        <option value="">All Roles</option>

                        <option value="ADMIN">Admin</option>

                        <option value="USER">User</option>

                        <option value="OWNER">Store Owner</option>

                    </select>

                </div>

            </div>

            <table className="table table-hover table-bordered">

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

                        users.length > 0 ?

                            users.map(user => (

                                <tr key={user.id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.address}</td>

                                    <td>{user.role}</td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center"
                                >

                                    No Users Found

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </AdminLayout>

    );

}

export default Users;