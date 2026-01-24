import React, { useContext, useState, useEffect } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";
import { useNotificationStore } from "../../lib/notificationStore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    if (currentUser) fetch();
  }, [currentUser, fetch]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu}>
            Dar<span>Hub</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="nav-links">
          {currentUser?.role === "ADMIN" && (
            <Link to="/admin/overview">Dashboard</Link>
          )}
          {["DEVELOPER", "NORMAL"].includes(currentUser?.role) && (
            <Link to="/dashboard/profile">Dashboard</Link>
          )}
          <Link to="/list">Buy</Link>
          <Link to="/list">Rent</Link>
          <Link to="/agent">Agents</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {currentUser ? (
            <>
              <Link to="/chats" className="chat-btn">
                {number > 0 && <span className="badge">{number}</span>}
                <ChatIcon />
              </Link>

              <Link
                to={
                  currentUser.role === "ADMIN"
                    ? "/admin/overview"
                    : "/dashboard/profile"
                }
                className="profile-box"
              >
                <img
                  src={
                    currentUser?.avatar ||
                    "https://i.postimg.cc/J7dgwngh/profile-picture.png"
                  }
                  alt="profile"
                />
                <span>{currentUser?.username.trim().split(/\s+/)[0]}</span>
              </Link>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              Sign In
            </Link>
          )}

          {currentUser?.role !== "ADMIN" && (
            <Link to="/addPost" className="post-btn">
              Post Ad <span>Free</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        {currentUser?.role === "ADMIN" && (
          <Link to="/admin/overview" onClick={closeMenu}>
            Dashboard
          </Link>
        )}
        {["DEVELOPER", "NORMAL"].includes(currentUser?.role) && (
          <Link to="/dashboard/profile" onClick={closeMenu}>
            Dashboard
          </Link>
        )}

        <Link to="/list" onClick={closeMenu}>
          Buy
        </Link>
        <Link to="/list" onClick={closeMenu}>
          Rent
        </Link>
        <Link to="/agent" onClick={closeMenu}>
          Agents
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>

        <div className="mobile-divider"></div>

        {currentUser ? (
          <>
            <Link to="/chats" onClick={closeMenu}>
              Messages
            </Link>
            <Link
              to={
                currentUser.role === "ADMIN"
                  ? "/admin/overview"
                  : "/dashboard/profile"
              }
              onClick={closeMenu}
            >
              Profile
            </Link>
          </>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Sign In
          </Link>
        )}

        {currentUser?.role !== "ADMIN" && (
          <Link to="/addPost" className="mobile-post-btn" onClick={closeMenu}>
            Post Ad
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
