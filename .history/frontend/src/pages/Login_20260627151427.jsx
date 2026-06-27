import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", form);

            login(res.data.user, res.data.token);

            if (res.data.user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else if (res.data.user.role === "OWNER") {
                navigate("/owner/dashboard");
            } else {
                navigate("/user/dashboard");
            }

        } catch (err) {

            alert(err.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card p-4 shadow">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                className="form-control mb-3"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                            />

                            <input
                                className="form-control mb-3"
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                            />

                            <button className="btn btn-primary w-100">
                                Login
                            </button>

                        </form>

                        <p className="mt-3 text-center">
                            New User?{" "}
                            <Link to="/register">
                                Register
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;