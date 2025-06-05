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
                {currentUser.username}
            </span>
            <Link className='profile-btn' to="/profile" onClick={handleLinkClick}>
                {number > 0 && <div className="notification">{number}</div>}
                <span>Profile</span>
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

            <div className="menu-items">
                <Link to="/" onClick={handleLinkClick}>Home</Link>
                <Link to="/list" onClick={handleLinkClick}>Properties</Link>
                <Link to="/about" onClick={handleLinkClick}>About</Link>
                <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
            </div>

            <div className="right-side">
                {currentUser ? renderUserProfile() : (
                    <div>
                        <Link to="/login" onClick={handleLinkClick}>Sign In</Link>
                        <Link className="register" to="/register" onClick={handleLinkClick}>Sign Up</Link>
                    </div>
                )}

                <span
                    className="menu-icon"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <img width="25px" src="https://i.postimg.cc/NMbG8mX1/menu.png" alt="menu icon" />
                </span>

                <div className={menuOpen ? "side-menu active" : "side-menu"}>
                    <Link to="/" onClick={handleLinkClick}>Home</Link>
                    <Link to="/list" onClick={handleLinkClick}>Properties</Link>
                    <Link to="/about" onClick={handleLinkClick}>About</Link>
                    <Link to="/contact" onClick={handleLinkClick}>Contact</Link>

                    <hr className="side-menu-devider" />

                    {currentUser ? (
                        <div className="navbar-profile">
                            <span>
                                <img
                                    src={currentUser.avatar || "https://i.postimg.cc/J7dgwngh/profile-picture.png"}
                                    alt="profile"
                                />
                                {currentUser.username}
                            </span>
                            <Link className='profile-btn' to="/profile" onClick={handleLinkClick}>
                                {number > 0 && <div className="notification">{number}</div>}
                                <span>Profile</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="navbar-profile">
                            <Link to="/login" onClick={handleLinkClick}>Sign In</Link>
                            <Link className="register" to="/register" onClick={handleLinkClick}>Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
