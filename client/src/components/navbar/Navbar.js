import React, { useContext, useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContex';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);


    // console.log(currentUser);

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
                    {/* <Link to={`/register`}>Register</Link>
                    <Link to={`/login`}>Login</Link> */}

                </div>
            </div>


            <div className="right-side">

                {currentUser ?
                    <div className='navbar-profile'>
                        <span>
                            <img src={currentUser.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"} alt="profile-image" /> {currentUser.username}
                        </span>
                        {/* <Link className='profile-btn' to={`/profile`}>Profile</Link> */}
                        <Link className='profile-btn' to={`/profile`}>
                            <div className="notification">3</div>
                            <span>Profile</span>
                        </Link>

                    </div >
                    :
                    <div>
                        <Link to={`/login`}>Sign In</Link>
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

                    {currentUser ?
                        <div className='navbar-profile'>
                            <span>
                                <img src={currentUser.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"} alt="profile-image" /> {currentUser.username}
                            </span>
                            <Link className='profile-btn' to={`/profile`}>Profile</Link>
                        </div >
                        :
                        <div>
                            <Link to={`/login`}>Sign In</Link>
                            <Link className='register' to={`/register`}>Sign Up</Link>
                        </div >
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;