import React, { useContext, useState, useEffect } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContex';
import { useNotificationStore } from '../../lib/notificationStore';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const fetch = useNotificationStore((state) => state.fetch);
    const number = useNotificationStore((state) => state.number);

    useEffect(() => {
        if (currentUser) {
            fetch();
        }
    }, [currentUser, fetch]);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const renderUserProfile = () => (
        <div className='navbar-profile'>
            <span>
                <img
                    loading="lazy"
                    src={currentUser.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"}
                    alt="profile"
                />
                {currentUser.username.toUpperCase()}
            </span>
            <Link className='profile-btn' to="/profile" onClick={handleLinkClick}>
                {number > 0 && <div className="notification">{number}</div>}
                <span>PROFILE</span>
            </Link>
        </div>
    );

    return (
        <nav>
            <div className="left-side">
                <div className="logo">
                    <Link to="/" onClick={handleLinkClick}>
                        <h2>Haven House</h2>
                    </Link>
                </div>
            </div>



            <div className="middle-side menu-items">
                <Link to="/list" onClick={handleLinkClick}>PROPERTY</Link>
                <Link to="/about" onClick={handleLinkClick}>AGENT</Link>
                <Link to="/list" onClick={handleLinkClick}>DEVELOPER</Link>
                <Link to="/about" onClick={handleLinkClick}>ABOUT</Link>
                <Link to="/contact" onClick={handleLinkClick}>CONTACT</Link>
            </div>



            <div className="right-side">

                {currentUser ? renderUserProfile() : (
                    <Link className='signin' to="/login" onClick={handleLinkClick}>SIGN IN</Link>
                )}

                <Link className='register' to="/addPost" onClick={handleLinkClick}>LIST YOUR PROPERTY</Link>


                {/* {currentUser ? renderUserProfile() : (
                    <div>
                        <Link to="/login" onClick={handleLinkClick}>Sign In</Link>
                        <Link className="register" to="/register" onClick={handleLinkClick}>Sign Up</Link>
                    </div>
                )} */}

                {/* FOR SMALL SCREEN */}
                <span
                    className="menu-icon"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <img width="25px" src="https://i.postimg.cc/NMbG8mX1/menu.png" alt="menu icon" />
                </span>

                <div className={menuOpen ? "side-menu active" : "side-menu"}>
                    <Link to="/list" onClick={handleLinkClick}>PROPERTY</Link>
                    <Link to="/about" onClick={handleLinkClick}>AGENT</Link>
                    <Link to="/list" onClick={handleLinkClick}>DEVELOPER</Link>
                    <Link to="/about" onClick={handleLinkClick}>ABOUT</Link>
                    <Link to="/contact" onClick={handleLinkClick}>CONTACT</Link>



                    <hr className="side-menu-devider" />

                    {currentUser ? renderUserProfile() : (
                        <Link className='signin' to="/login" onClick={handleLinkClick}>SIGN IN</Link>
                    )}
                    <Link className='register' to="/addPost" onClick={handleLinkClick}>LIST YOUR PROPERTY</Link>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
