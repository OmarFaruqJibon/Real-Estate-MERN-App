import React from "react";
import "./Contact.scss";
import Footer from './../../components/footer/Footer';

const Contact = () => {
    return (
        <>
            <section className="contact-page">
                <div class="overlay"></div>
                <div className="contact-left">
                    {/* <div className="contact-header">
                        <h1>Contact Us</h1>
                        <p>We'd love to hear from you. Get in touch with us!</p>
                    </div> */}

                    <div className="contact-form-section">
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea placeholder="Write your message"></textarea>
                            </div>
                            <button className="contact-btn" type="submit">Send Message</button>
                        </form>
                    </div>
                </div>

                <div className="contact-details">
                    <h2>Head Office</h2>
                    <p><strong>Address:</strong> 123 Real Estate St, City, Country</p>
                    <p><strong>Email:</strong> contact@realestate.com</p>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;
