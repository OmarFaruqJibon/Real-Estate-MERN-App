import React, { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from "react-router-dom";
import apiCall from '../../lib/apiCall';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContex';

const Login = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useContext(AuthContext);

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

            // localStorage.setItem("user", JSON.stringify(res.data))
            updateUser(res.data);

            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="registerPage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="password" type="password" placeholder="Password" />
                    <button disabled={isLoading}>Login</button>
                    {error && <span>{error}</span>}
                    <span className='already'>Already Have an Account? <Link to="/register">Register Here</Link></span>

                </form>
            </div>
            <div className="imgContainer">
                <img src="https://i.postimg.cc/8CkqcYc6/Login-bro.png" alt="log in image" />
            </div>
        </div>
    );
};

export default Login;