import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const user = true;

    return (
        <nav>
            <div className="left-side">

                <div className="logo">
                    <Link to={`/`}>
                        <img width={'110px'} src="https://i.postimg.cc/J7P8GRFf/logo.png" alt="Logo" />
                        {/* <span>
                            Haven Houses
                        </span> */}
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

                {user ?
                    <div className='navbar-profile'>
                        <span>
                            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" /> Will Smith
                        </span>
                        <Link className='profile-btn' to={`/profile`}>Profile</Link>
                    </div >
                    :
                    <div>
                        <Link to={`/signin`}>Sign In</Link>
                        <Link className='register' to={`/register`}>Sign Up</Link>
                    </div >
                }


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
                    {user ?
                        <div className='navbar-profile'>
                            <span>
                                <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" /> Will Smith
                            </span>
                            <Link className='profile-btn' to={`/profile`}>Profile</Link>
                        </div >
                        :
                        <div>
                            <Link to={`/signin`}>Sign In</Link>
                            <Link className='register' to={`/register`}>Sign Up</Link>
                        </div >
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;