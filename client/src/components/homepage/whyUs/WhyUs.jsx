import React from "react";
import "./WhyUs.scss";
import { CarFront, HandCoins, Search } from "lucide-react";

const WhyUs = () => {
  return (
    <section className="why-us-container">
      <div className="top">
        <span>WHY US</span>
        <h1>Why Choose Us?</h1>
        <p>
          We have over 8 years of experience and knowledge on how to sell more.
        </p>
      </div>

      <div className="card">
        <div className="card-one">
          <div>
            <Search size={60} className="icon" />
          </div>
          <div className="card-text">
            <h3>Find Your Home</h3>
            <p>
              Quis ipsum suspendisse ultrices, <br /> risus commodo viverra
              maecenas <br />
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>

        <div className="card-one">
          <div>
            <CarFront size={60} className="icon" />
          </div>
          <div className="card-text">
            <h3>Transportation support</h3>
            <p>
              Quis ipsum suspendisse ultrices, <br /> risus commodo viverra
              maecenas <br />
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>
        <div className="card-one">
          <div>
            <HandCoins size={60} className="icon" />
          </div>
          <div className="card-text">
            <h3>Save Your Money</h3>
            <p>
              Quis ipsum suspendisse ultrices, <br /> risus commodo viverra
              maecenas <br />
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
