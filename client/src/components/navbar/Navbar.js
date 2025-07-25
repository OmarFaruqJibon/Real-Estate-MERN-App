import React, { useContext, useState, useEffect } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";
import { useNotificationStore } from "../../lib/notificationStore";
import MenuIcon from "@mui/icons-material/Menu";
import { Dashboard } from "@mui/icons-material";
import RealEstateAgentIcon from "@mui/icons-material/RealEstateAgent";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ListIcon from "@mui/icons-material/List";
import ChatIcon from "@mui/icons-material/Chat";

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
        <span>
          <ChatIcon
            className="chat-icon"
            sx={{ color: "white", fontSize: "20px" }}
          />
          MESSAGE
        </span>
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
      {/* FOR LEFT*/}
      <div className="left-side">
        {" "}
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <h2>DarHub</h2>
          </Link>
        </div>
      </div>

      {/* FOR middle */}
      <div className="middle-side">
        {" "}
        {/* Middle menu */}
        <div className=" menu-items">
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
            BUY
          </Link>
          <Link to="/list" onClick={handleLinkClick}>
            RENT
          </Link>
          <Link to="/agent" onClick={handleLinkClick}>
            AGENT
          </Link>
          <Link to="/contact" onClick={handleLinkClick}>
            CONTACT
          </Link>
        </div>
      </div>

      {/* FOR right */}
      <div className="right-side">
        {/* Profile */}
        {currentUser ? (
          renderUserProfile()
        ) : (
          <Link className="signin" to="/login" onClick={handleLinkClick}>
            SIGN IN
          </Link>
        )}

        {currentUser?.role !== "ADMIN" && (
          <Link className="ad-btn" to="/addPost" onClick={handleLinkClick}>
            POST AD
            <span className="free">FREE</span>
          </Link>
        )}
      </div>

      {/* SMALL SCREEN MENU ICON */}
      <span
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <MenuIcon sx={{ fontSize: "30px" }} />
      </span>

      {/* FOR SMALL SCREEN */}
      <div className="small-screen-menu">
        <div className={menuOpen ? "side-menu active" : "side-menu"}>
          {currentUser?.role === "ADMIN" && (
            <Link to="/admin/overview">
              <Dashboard sx={{ color: "white", fontSize: "20px" }} />
              Dashboard
            </Link>
          )}

          {currentUser?.role === "DEVELOPER" && (
            <Link to="/dashboard/profile">
              <Dashboard sx={{ color: "white", fontSize: "20px" }} />
              DASHBOARD
            </Link>
          )}

          {currentUser?.role === "NORMAL" && (
            <Link to="/dashboard/profile">
              <Dashboard sx={{ color: "white", fontSize: "20px" }} />
              DASHBOARD
            </Link>
          )}

          <Link to="/list" onClick={handleLinkClick}>
            <ListIcon sx={{ color: "white", fontSize: "20px" }} />
            BUY
          </Link>
          <Link to="/list" onClick={handleLinkClick}>
            <ListIcon sx={{ color: "white", fontSize: "20px" }} />
            RENT
          </Link>
          <Link to="/agent" onClick={handleLinkClick}>
            <RealEstateAgentIcon sx={{ color: "white", fontSize: "20px" }} />
            AGENT
          </Link>
          <Link to="/contact" onClick={handleLinkClick}>
            <ContactSupportIcon sx={{ color: "white", fontSize: "20px" }} />
            CONTACT
          </Link>

          <hr className="side-menu-devider" />

          {currentUser ? (
            renderUserProfile()
          ) : (
            <Link className="signin" to="/login" onClick={handleLinkClick}>
              SIGN IN
            </Link>
          )}

          {currentUser?.role !== "ADMIN" && (
            <Link className="ad-btn" to="/addPost" onClick={handleLinkClick}>
              POST AD
              <span className="free">FREE</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
