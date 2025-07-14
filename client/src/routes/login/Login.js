import React, { useState, useContext } from 'react';
import './Login.scss';
import { Link, useNavigate } from "react-router-dom";
import apiCall from '../../lib/apiCall';
import { AuthContext } from '../../context/AuthContex';

const Login = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const formData = new FormData(e.target);

        const phone = formData.get("phone");
        const password = formData.get("password");

        try {
            const res = await apiCall.post("/auth/login", {
                phone,
                password,
            });

            updateUser(res.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="registerPage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome Back</h1>
                    <input name="phone" type="text" placeholder="Phone Number" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <span className='already'>
                        Don't have an account? <Link to="/register">Register Here</Link>
                    </span>
                </form>
            </div>
            <div className="imgContainer">
                <img src="https://i.postimg.cc/8CkqcYc6/Login-bro.png" alt="log in" />
            </div>
        </div>
    );
};

export default Login;
