import React from 'react';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav>
            <div className="left-side">

                <div className="logo">
                    <a href="/">
                        <img width={'30px'} src="https://i.postimg.cc/Cx4G0wVH/favicon.png" alt="Logo" />
                        RealState
                    </a>
                </div>

                <div className="menu-items">
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contact</a>

                </div>
            </div>




            <div className="right-side">
                <a href="/">Sign in</a>
                <a href="/">Sign up</a>
            </div>
        </nav>
    );
};

export default Navbar;