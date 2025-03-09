import React from "react";
import "./Footer.scss";
import {
  ChevronRight,
  Clock4,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Map,
  Phone,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="overlay"></div>
      <div className="footer-content">
        <div className="single-content">
          <h1>Haven House</h1>
          <p>
            Lorem ipsum dolo sit azmet <br /> consecter dipise consult elit.
            <br /> Maecenas mamus antesme non.
          </p>
          <div className="social">
            <Twitter size={20} color="#09aa57" />
            <Facebook size={20} color="#09aa57" />
            <Instagram size={20} color="#09aa57" />
            <Linkedin size={20} color="#09aa57" />
          </div>
        </div>

        <div className="single-content">
          <h1>CONTACT US</h1>

          <div className="contacts">
            <div className="contact">
              <Map size={15} color="#09aa57" />
              <span>3711-2880 Nulla St, Mankato, Mississippi</span>
            </div>
            <div className="contact">
              <Phone size={15} color="#09aa57" />
              <span>(+88) 666 121 4321</span>
            </div>
            <div className="contact">
              <Mail size={15} color="#09aa57" />
              <span>info.email.com</span>
            </div>
            <div className="contact">
              <Clock4 size={15} color="#09aa57" />
              <span>Mon - Sat, 08 AM - 06 PM</span>
            </div>
          </div>
        </div>

        <div className="single-content">
          <h1>POPULAR PLACES</h1>

          <div className="places">
            <div className="place">
              <div>
                <ChevronRight size={20} color="#09aa57" />
                <span>Mankato</span>
              </div>
              <div>
                <ChevronRight size={20} color="#09aa57" />
                <span>Mankato</span>
              </div>
              <div>
                <ChevronRight size={20} color="#09aa57" />
                <span>Mankato</span>
              </div>
              <div>
                <ChevronRight size={20} color="#09aa57" />
                <span>Mankato</span>
              </div>
            </div>
            <div className="place">
              <div>
                <ChevronRight size={20} color="#09aa57" />
                <span>Mankato</span>
              </div>
              <div>
                <ChevronRight size={20} color="#09aa57" />
                <span>Mankato</span>
              </div>
              <div>
                <ChevronRight size={20} color="#09aa57" />
                <span>Mankato</span>
              </div>
              <div>
                <ChevronRight size={20} color="#09aa57" />
                <span>Mankato</span>
              </div>
            </div>
          </div>
        </div>

        <div className="single-content">
          <h1>Community</h1>

          <div className="contacts">
            <div className="contact community">
              <ChevronRight size={20} color="#09aa57" />
              <span>Search Properties</span>
            </div>
            <div className="contact community">
              <ChevronRight size={20} color="#09aa57" />
              <span>For Agents</span>
            </div>
            <div className="contact community">
              <ChevronRight size={20} color="#09aa57" />
              <span>Reviews</span>
            </div>
            <div className="contact community">
              <ChevronRight size={20} color="#09aa57" />
              <span>FAQs</span>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <p className="copyright">&copy; 2025 Real Estate. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
