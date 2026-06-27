import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    return (

        <div
            className="bg-light border-end"
            style={{
                width: "220px",
                minHeight: "100vh"
            }}
        >

            <h4 className="p-3">
                Dashboard
            </h4>

            {user.role === "ADMIN" && (

                <>
                    <NavLink
                        className="d-block p-3 text-decoration-none"
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        className="d-block p-3 text-decoration-none"
                        to="/admin/users"
                    >
                        Users
                    </NavLink>

                    <NavLink
                        className="d-block p-3 text-decoration-none"
                        to="/admin/stores"
                    >
                        Stores
                    </NavLink>

                </>

            )}

            {user.role === "USER" && (

                <NavLink
                    className="d-block p-3 text-decoration-none"
                    to="/user/dashboard"
                >
                    Stores
                </NavLink>

            )}

            {user.role === "OWNER" && (

                <NavLink
                    className="d-block p-3 text-decoration-none"
                    to="/owner/dashboard"
                >
                    Dashboard
                </NavLink>

            )}

        </div>

    );

}

export default Sidebar;