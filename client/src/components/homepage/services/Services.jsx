import React from "react";
import "./Services.scss";

const Services = () => {
  return (
    <section className="services-container">
      <div className="top">
        <span>SERVICES</span>
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
              Quis ipsum suspendisse ultrices, risus commodo viverra maecenas
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
              Quis ipsum suspendisse ultrices, risus commodo viverra maecenas
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
              Quis ipsum suspendisse ultrices, risus commodo viverra maecenas
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
              Quis ipsum suspendisse ultrices, risus commodo viverra maecenas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
