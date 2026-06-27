import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();
        navigate("/");

    };

    return (

        <nav className="navbar navbar-dark bg-dark px-4">

            <Link
                className="navbar-brand"
                to="/"
            >
                Store Rating System
            </Link>

            <div className="text-white">

                {user?.name}

                <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;