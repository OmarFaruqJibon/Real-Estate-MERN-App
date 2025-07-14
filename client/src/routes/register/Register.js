import React, { useState } from 'react';
import './Register.scss';
import { Link, useNavigate } from "react-router-dom";
import apiCall from '../../lib/apiCall';

const Register = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setPasswordMatchError("");
        setIsLoading(true);

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const role = formData.get("role");

        if (password !== confirmPassword) {
            setPasswordMatchError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const res = await apiCall.post("/auth/register", {
                username,
                email,
                phone,
                password,
                role,
            });
            console.log(res.data);

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="registerPage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h3>CREATE AN ACCOUNT</h3>

                    <div className='radio-group'>
                        <p>I am</p>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="NORMAL"
                                defaultChecked
                                required
                            />
                            Individual
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="DEVELOPER"
                                required
                            />
                            Developer
                        </label>
                        {/* Admin radio option intentionally hidden */}

                    </div>








                    <input name="username" type="text" placeholder="Username" required />
                    <input name="email" type="email" placeholder="Email" required />
                    <input name="phone" type="text" placeholder="Phone Number" required />
                    <input name="password" type="password" placeholder="Password" required />
                    <input name="confirmPassword" type="password" placeholder="Confirm Password" required />


                    <button disabled={isLoading}>Register</button>

                    {passwordMatchError && <span style={{ color: 'red' }}>{passwordMatchError}</span>}
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    <span className='already'>
                        Already Have an Account? <Link to="/login">Login Here</Link>
                    </span>
                </form>
            </div>
            <div className="imgContainer">
                <img src="https://i.postimg.cc/8CkqcYc6/Login-bro.png" alt="log in illustration" />
            </div>
        </div>
    );
};

export default Register;
