import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from "react-router-dom";
import apiCall from '../../lib/apiCall';

const Login = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setIsLoading(true);

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await apiCall.post("/auth/login", {
                username,
                password,
            });

            localStorage.setItem("user", JSON.stringify(res.data))

            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="password" type="password" placeholder="Password" />
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <Link to="/register">{"Don't"} you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
};

export default Login;