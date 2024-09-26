import React, { useState } from 'react';
import './Navbar.scss';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <div className="left-side">

                <div className="logo">
                    <a href="/">
                        <img width={'30px'} src="https://i.postimg.cc/vBXGxfBF/Haven-home-logo2.png" alt="Logo" />
                        <span>
                            Haven Houses
                        </span>
                    </a>
                </div>

                <div className="menu-items">
                    <a href="/">Home</a>
                    <a href="/list">List</a>
                    <a href="/">About</a>
                    <a href="/">Contact</a>

                </div>
            </div>




            <div className="right-side">
                <a href="/">Sign in</a>
                <a className='register' href="/">Sign up</a>

                <div className="menu-icon">
                    <img width={'25px'} src="https://i.postimg.cc/NMbG8mX1/menu.png" alt="menu icon"
                        onClick={() => setMenuOpen(!menuOpen)} />
                </div>

                <div className={menuOpen ? "side-menu active" : "side-menu"}>
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contact</a>
                    <hr className='side-menu-devider' />
                    <a href="/">Sign in</a>
                    <a className='register' href="/">Sign up</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;