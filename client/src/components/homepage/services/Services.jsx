import React, { useEffect } from "react";
import AOS from "aos";
import "./Services.scss";

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  return (
    <section data-aos="fade-up" className="services-container">
      <div className="top">
        <span className="lined-title">SERVICES</span>
        <h1>Our Services</h1>
      </div>

      <div className="service-cards">
        <div className="service-card">
          <div className="image">
            <img src="https://i.postimg.cc/BvG4Wjkg/searching.png" alt="" />
            {/* <p>1</p> */}
          </div>

          <div className="card-text">
            <h3>Find Places Anywhere</h3>
            <p>
              Browse listings in your city or beyond, and find homes that match
              your needs quickly and easily
            </p>
          </div>
        </div>
        <div className="service-card">
          <div className="image">
            <img src="https://i.postimg.cc/CKXFvvYR/realtor.png" alt="" />
            {/* <p>2</p> */}
          </div>
          <div className="card-text">
            <h3>We Have Agents</h3>
            <p>
              Our expert agents are always ready to help you buy, sell, or rent
              with confidence and care
            </p>
          </div>
        </div>
        <div className="service-card">
          <div className="image">
            <img src="https://i.postimg.cc/xCm9BKTt/plan.png" alt="" />
            {/* <p>3</p> */}
          </div>
          <div className="card-text">
            <h3>Chat With Agent</h3>
            <p>
              Message agents directly to ask questions, get details, or book
              property viewings fast anytime
            </p>
          </div>
        </div>
        <div className="service-card">
          <div className="image">
            <img src="https://i.postimg.cc/Gt1bRH4r/real-estate.png" alt="" />
            {/* <p>4</p> */}
          </div>
          <div className="card-text">
            <h3>Buy & Rent Properties</h3>
            <p>
              Explore homes for sale or rent, compare options, and make the
              right move for you and your dream
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
