import React from "react";
import "./HowWorks.scss";

const HowWorks = () => {
  return (
    <section className="how-works-container">
      <div className="top">
        <span className="lined-title">WORK FLOW</span>
        <h1>How it Works</h1>
      </div>

      <div className="card">
        <div className="card-one">
          <div className="image">
            <img src="https://i.postimg.cc/htkhqWns/client1-png.webp" alt="" />
            <p>1</p>
          </div>

          <div className="card-text">
            <h3>Choose A Category</h3>
            <p>
              Browse listings by location, price, or property type in just
              seconds
            </p>
          </div>
        </div>
        <div className="card-one">
          <div className="image">
            <img src="https://i.postimg.cc/mDRDtYtF/client2-png.webp" alt="" />
            <p>2</p>
          </div>
          <div className="card-text">
            <h3>Find Real Esate</h3>
            <p>
              Explore property details and photos to pick your perfect match
            </p>
          </div>
        </div>
        <div className="card-one">
          <div className="image">
            <img src="https://i.postimg.cc/4d53tY92/client3-png.webp" alt="" />
            <p>3</p>
          </div>
          <div className="card-text">
            <h3>Take The Key</h3>
            <p>
              Schedule a visit and finish the paperwork very fast abd without
              hassle
            </p>
          </div>
        </div>
        <div className="card-one">
          <div className="image">
            <img src="https://i.postimg.cc/vm5TYqHs/client4-png.webp" alt="" />
            <p>4</p>
          </div>
          <div className="card-text">
            <h3>Live Happy</h3>
            <p>
              Move in and enjoy your new space with full peace of mind at your
              dream house
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
