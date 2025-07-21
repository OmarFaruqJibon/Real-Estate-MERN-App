import React, { useContext, useState, useEffect } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";
import { useNotificationStore } from "../../lib/notificationStore";
// import logo from "../../assets/logo-shape.png";

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
    <div className="navbar-profile">
      <Link className="message-btn" to="/chats" onClick={handleLinkClick}>
        {number > 0 && <div className="notification">{number}</div>}
        <span>MESSAGE</span>
      </Link>

      {currentUser?.role === "ADMIN" && (
        <Link
          className="profile-btn"
          to="/admin/overview"
          onClick={handleLinkClick}
        >
          <div className="profile-info">
            <span>{currentUser?.username.trim().split(/\s+/)[0]}</span>
            <img
              loading="lazy"
              src={
                currentUser?.avatar ||
                "https://i.postimg.cc/J7dgwngh/profile-picture.png"
              }
              alt="profile"
            />
          </div>
        </Link>
      )}

      {["DEVELOPER", "NORMAL"].includes(currentUser?.role) && (
        <Link
          className="profile-btn"
          to="/dashboard/profile"
          onClick={handleLinkClick}
        >
          <div className="profile-info">
            <span>{currentUser?.username.trim().split(/\s+/)[0]}</span>
            <img
              loading="lazy"
              src={
                currentUser?.avatar ||
                "https://i.postimg.cc/J7dgwngh/profile-picture.png"
              }
              alt="profile"
            />
          </div>
        </Link>
      )}
    </div>
  );

  return (
    <nav className="navbar-container">
      <div className="left-side">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            {/* <img src={logo} alt="logo" /> */}
            <h2>DarHub</h2>
          </Link>
        </div>
      </div>

      <div className="middle-side menu-items">
        {currentUser?.role === "ADMIN" && (
          <Link style={{ color: "#ffffffff" }} to="/admin/overview">
            Dashboard
          </Link>
        )}

        {currentUser?.role === "DEVELOPER" && (
          <Link style={{ color: "#ffffffff" }} to="/dashboard/profile">
            DASHBOARD
          </Link>
        )}

        {currentUser?.role === "NORMAL" && (
          <Link style={{ color: "#ffffffff" }} to="/dashboard/profile">
            DASHBOARD
          </Link>
        )}

        <Link to="/list" onClick={handleLinkClick}>
          PROPERTY
        </Link>
        <Link to="/agent" onClick={handleLinkClick}>
          AGENT
        </Link>
        <Link to="/contact" onClick={handleLinkClick}>
          CONTACT
        </Link>
      </div>

      <div className="right-side">
        {currentUser ? (
          renderUserProfile()
        ) : (
          <Link className="signin" to="/login" onClick={handleLinkClick}>
            SIGN IN
          </Link>
        )}

        {currentUser?.role !== "ADMIN" && (
          <Link className="register" to="/addPost" onClick={handleLinkClick}>
            LIST YOUR PROPERTY
          </Link>
        )}

        {/* FOR SMALL SCREEN */}
        <span
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <img
            width="25px"
            src="https://i.postimg.cc/NMbG8mX1/menu.png"
            alt="menu icon"
          />
        </span>

        <div className={menuOpen ? "side-menu active" : "side-menu"}>
          <Link to="/list" onClick={handleLinkClick}>
            PROPERTY
          </Link>
          <Link to="/agent" onClick={handleLinkClick}>
            AGENT
          </Link>
          <Link to="/contact" onClick={handleLinkClick}>
            CONTACT
          </Link>

          {currentUser?.role === "ADMIN" && (
            <Link style={{ color: "#09aa57" }} to="/admin/overview">
              Dashboard
            </Link>
          )}

          {currentUser?.role === "DEVELOPER" && (
            <Link style={{ color: "#09aa57" }} to="/dashboard/profile">
              DASHBOARD
            </Link>
          )}

          {currentUser?.role === "NORMAL" && (
            <Link style={{ color: "#09aa57" }} to="/dashboard/profile">
              DASHBOARD
            </Link>
          )}

          <hr className="side-menu-devider" />

          {currentUser ? (
            renderUserProfile()
          ) : (
            <Link className="signin" to="/login" onClick={handleLinkClick}>
              SIGN IN
            </Link>
          )}

          {currentUser?.role !== "ADMIN" && (
            <Link className="register" to="/addPost" onClick={handleLinkClick}>
              LIST YOUR PROPERTY
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
