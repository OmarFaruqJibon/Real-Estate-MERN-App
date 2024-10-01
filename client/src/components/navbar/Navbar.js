import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav>
            <div className="left-side">

                <div className="logo">
                    <Link to={`/`}>
                        <img width={'30px'} src="https://i.postimg.cc/vBXGxfBF/Haven-home-logo2.png" alt="Logo" />
                        <span>
                            Haven Houses
                        </span>
                    </Link>
                </div>

                <div className="menu-items">
                    <Link to={`/`}>Home</Link>
                    <Link to={`/list`}>List</Link>
                    <Link to={`/about`}>About</Link>
                    <Link to={`/contact`}>Contact</Link>

                </div>
            </div>




            <div className="right-side">
                <Link to={`/signin`}>Sign In</Link>
                <Link className='register' to={`/register`}>Sign Up</Link>


                <div className="menu-icon">
                    <img width={'25px'} src="https://i.postimg.cc/NMbG8mX1/menu.png" alt="menu icon"
                        onClick={() => setMenuOpen(!menuOpen)} />
                </div>

                <div className={menuOpen ? "side-menu active" : "side-menu"}>
                    <Link to={`/`}>Home</Link>
                    <Link to={`/list`}>List</Link>
                    <Link to={`/about`}>About</Link>
                    <Link to={`/contact`}>Contact</Link>
                    <hr className='side-menu-devider' />
                    <Link to={`/signin`}>Sign IN</Link>
                    <Link className='register' to={`/register`}>Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;