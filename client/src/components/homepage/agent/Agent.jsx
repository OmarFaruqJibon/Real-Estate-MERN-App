import React from "react";
import "./Agent.scss";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const agents = [
  {
    name: "John Doe",
    image: "https://i.postimg.cc/zBDzSqBk/team-1.webp",
  },

  {
    name: "Alex Mike",
    image: "https://i.postimg.cc/htKWzcG4/team-3.webp",
  },

  {
    name: "Mike Hex",
    image: "https://i.postimg.cc/QxGrDpGT/team-2.webp",
  },

  {
    name: "Shown Med",
    image: "https://i.postimg.cc/C5DTDKD5/team-4.webp",
  },
];

const Agent = () => {
  return (
    <section className="agent-container">
      <div className="top">
        <span>OUR AGENTS</span>
        <h1>Meets Our Agents</h1>
      </div>

      <div className="agent-card">
        {agents.map((testimonial, index) => (
          <div key={index} className="agent-single-card">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="agent-img"
            />
            <div className="agent-info">
              <p className="agent-name">{testimonial.name}</p>
              <div className="social">
                <Twitter size={20} color="#ffffff" />
                <Facebook size={20} color="#ffffff" />
                <Instagram size={20} color="#ffffff" />
                <Linkedin size={20} color="#ffffff" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Agent;
