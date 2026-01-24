import React from "react";
import "./Footer.scss";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-pro">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-col brand">
          <h2>
            Dar<span>Hub</span>
          </h2>
          <p>
            DarHub is a modern real estate marketplace in Saudi Arabia, helping
            users buy, rent, and sell properties with trusted agents and smart
            tools.
          </p>

          <div className="social-links">
            <Facebook />
            <Twitter />
            <Instagram />
            <Linkedin />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/list">Buy Property</Link>
            </li>
            <li>
              <Link to="/list">Rent Property</Link>
            </li>
            <li>
              <Link to="/agent">Find Agents</Link>
            </li>
            <li>
              <Link to="/addPost">Post Property</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* POPULAR CITIES */}
        <div className="footer-col">
          <h4>Popular Cities</h4>
          <ul>
            <li>Riyadh</li>
            <li>Jeddah</li>
            <li>Dammam</li>
            <li>Khobar</li>
            <li>Makkah</li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-col contact">
          <h4>Contact Information</h4>

          <div className="contact-item">
            <MapPin />
            <span>Riyadh, Saudi Arabia</span>
          </div>

          <div className="contact-item">
            <Phone />
            <span>+966 55 082 5421</span>
          </div>

          <div className="contact-item">
            <Mail />
            <span>omarfaruq.jb@gmail.com</span>
          </div>

          <p className="working-hours">
            Working Hours: Sun - Thu, 9:00 AM - 6:00 PM
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DarHub. All rights reserved.</p>

        <div className="footer-policy">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
