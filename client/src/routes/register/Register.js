import React, { useState } from 'react';
import './Register.scss';
import { Link, useNavigate } from "react-router-dom";
import apiCall from '../../lib/apiCall';


const Register = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setIsLoading(true);
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await apiCall.post("/auth/register", {
                username,
                email,
                password,
            });
            console.log(res.data);

            navigate("/login");
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
                    <h1>Create an Account</h1>
                    <input name="username" type="text" placeholder="Username" />
                    <input name="email" type="text" placeholder="Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button disabled={isLoading}>Register</button>
                    {error && <span>{error}</span>}
                    <span className='already'>Already Have an Account? <Link to="/login">Login Here</Link></span>
                </form>
            </div>
            <div className="imgContainer">
                <img src="https://i.postimg.cc/8CkqcYc6/Login-bro.png" alt="log in image" />
            </div>
        </div>
    );
};

export default Register;