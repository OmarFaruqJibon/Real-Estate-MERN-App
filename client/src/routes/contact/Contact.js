import React from "react";
import "./Contact.scss";
import Footer from "../../components/footer/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  MessageSquare,
} from "lucide-react";

const Contact = () => {
  return (
    <>
      <section className="contact-page-pro">
        <div className="contact-container">
          {/* LEFT - INFO */}
          <div className="contact-info">
            <h1>Get in Touch</h1>
            <p>
              Have questions about properties, listings, or partnerships? Our
              team is here to help you with professional real estate solutions.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <Building2 size={22} />
                <div>
                  <h4>Head Office</h4>
                  <p>Riyadh, Saudi Arabia</p>
                </div>
              </div>

              <div className="info-card">
                <Mail size={22} />
                <div>
                  <h4>Email</h4>
                  <p>contact@realestate.com</p>
                </div>
              </div>

              <div className="info-card">
                <Phone size={22} />
                <div>
                  <h4>Phone</h4>
                  <p>+966 500 123 456</p>
                </div>
              </div>

              <div className="info-card">
                <Clock size={22} />
                <div>
                  <h4>Working Hours</h4>
                  <p>Sun – Thu: 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="contact-form-card">
            <h2>
              <MessageSquare size={20} /> Send us a message
            </h2>

            <form className="contact-form-pro">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your full name" />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="you@example.com" />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="How can we help you?" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button type="submit" className="contact-btn-pro">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
