import React from "react";
import "./Statistics.scss";

const Statistics = () => {
  return (
    <section className="statistics-container">
      <div class="overlay"></div>
      <div className="stat-body">
        <div className="counter">
          <h3>100+</h3>
          <p>Locations</p>
        </div>
        <div className="counter">
          <h3>1500+</h3>
          <p>Properties</p>
        </div>
        <div className="counter">
          <h3>75+</h3>
          <p>Agents</p>
        </div>
        <div className="counter">
          <h3>15+</h3>
          <p>Branches</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
