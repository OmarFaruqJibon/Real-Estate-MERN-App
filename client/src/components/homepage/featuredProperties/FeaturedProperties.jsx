import React from "react";
import "./FeaturedProperties.scss";
import { MapPin, Bath, BedDouble, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  return (
    <section className="featured-properties">
      <div className="top">
        <span>PROPERTY</span>
        <h1>Featured Properties</h1>
      </div>

      <div className="property-list">
        <div className="property-card">
          <Link to={"/list"}>
            <img
              src="https://i.postimg.cc/jd2bfG0L/prop1.webp"
              alt="Property 1"
            />
          </Link>
          <Link to={"/list"}>
            <h3>Comfortable Apartment in Palace</h3>
          </Link>

          <div className="mid">
            <p>
              <MapPin color="#000000c7" size={18} />{" "}
              <span>Rajshahi, Bngladesh</span>
            </p>
            <p
              style={{ color: "#0FB45F", fontSize: "16px", fontWeight: "600" }}
            >
              $250,000
            </p>
          </div>
          <div className="last">
            <p>
              <Landmark color="#000000c7" size={18} /> <span>1200 sqft</span>
            </p>
            <p>
              <BedDouble color="#000000c7" size={18} /> <span>3 Bed</span>
            </p>
            <p>
              <Bath color="#000000c7" size={18} /> <span>2 Bath</span>
            </p>
          </div>
        </div>

        <div className="property-card">
          <Link to={"/list"}>
            <img
              src="https://i.postimg.cc/cL8G9wJW/prop3.webp"
              alt="Property 2"
            />
          </Link>
          <Link to={"/list"}>
            <h3>Place perfect for nature lovers</h3>
          </Link>

          <div className="mid">
            <p>
              <MapPin color="#000000c7" size={18} />{" "}
              <span>Rajshahi, Bngladesh</span>
            </p>
            <p
              style={{ color: "#0FB45F", fontSize: "16px", fontWeight: "600" }}
            >
              $50,000
            </p>
          </div>
          <div className="last">
            <p>
              <Landmark color="#000000c7" size={18} /> <span>800 sqft</span>
            </p>
            <p>
              <BedDouble color="#000000c7" size={18} /> <span>2 Bed</span>
            </p>
            <p>
              <Bath color="#000000c7" size={18} /> <span>1 Bath</span>
            </p>
          </div>
        </div>

        <div className="property-card">
          <Link to={"/list"}>
            <img
              src="https://i.postimg.cc/1zhhLXgq/prop4.webp"
              alt="Property 3"
            />
          </Link>
          <Link to={"/list"}>
            <h3>Dream Place For Dreamers</h3>
          </Link>

          <div className="mid">
            <p>
              <MapPin color="#000000c7" size={18} />{" "}
              <span>Rajshahi, Bngladesh</span>
            </p>
            <p
              style={{ color: "#0FB45F", fontSize: "16px", fontWeight: "600" }}
            >
              $150,000
            </p>
          </div>
          <div className="last">
            <p>
              <Landmark color="#000000c7" size={18} /> <span>1800 sqft</span>
            </p>
            <p>
              <BedDouble color="#000000c7" size={18} /> <span>4 Bed</span>
            </p>
            <p>
              <Bath color="#000000c7" size={18} /> <span>2 Bath</span>
            </p>
          </div>
        </div>

        <div className="property-card">
          <Link to={"/list"}>
            <img
              src="https://i.postimg.cc/gjSb5KRz/hero1.webp"
              alt="Property 4"
            />
          </Link>
          <Link to={"/list"}>
            <h3>Nature Lovers Choice</h3>
          </Link>

          <div className="mid">
            <p>
              <MapPin color="#000000c7" size={18} />{" "}
              <span>Rajshahi, Bngladesh</span>
            </p>
            <p
              style={{ color: "#0FB45F", fontSize: "16px", fontWeight: "600" }}
            >
              $500,000
            </p>
          </div>
          <div className="last">
            <p>
              <Landmark color="#000000c7" size={18} /> <span>2500 sqft</span>
            </p>
            <p>
              <BedDouble color="#000000c7" size={18} /> <span>5 Bed</span>
            </p>
            <p>
              <Bath color="#000000c7" size={18} /> <span>3 Bath</span>
            </p>
          </div>
        </div>

        <div className="property-card">
          <Link to={"/list"}>
            <img
              src="https://i.postimg.cc/Y9tcCPz2/prop6.webp"
              alt="Property 5"
            />
          </Link>
          <Link to={"/list"}>
            <h3>Luxury Appartment</h3>
          </Link>

          <div className="mid">
            <p>
              <MapPin color="#000000c7" size={18} />{" "}
              <span>Rajshahi, Bngladesh</span>
            </p>
            <p
              style={{ color: "#0FB45F", fontSize: "16px", fontWeight: "600" }}
            >
              $300,000
            </p>
          </div>
          <div className="last">
            <p>
              <Landmark color="#000000c7" size={18} /> <span>2300 sqft</span>
            </p>
            <p>
              <BedDouble color="#000000c7" size={18} /> <span>4 Bed</span>
            </p>
            <p>
              <Bath color="#000000c7" size={18} /> <span>3 Bath</span>
            </p>
          </div>
        </div>

        <div className="property-card">
          <Link to={"/list"}>
            <img
              src="https://i.postimg.cc/5NrMSnbp/prop2.webp"
              alt="Property 6"
            />
          </Link>
          <Link to={"/list"}>
            <h3>Best Appartment With Budgett</h3>
          </Link>

          <div className="mid">
            <p>
              <MapPin color="#000000c7" size={18} />{" "}
              <span>Rajshahi, Bngladesh</span>
            </p>
            <p
              style={{ color: "#0FB45F", fontSize: "16px", fontWeight: "600" }}
            >
              $100,000
            </p>
          </div>
          <div className="last">
            <p>
              <Landmark color="#000000c7" size={18} /> <span>1000 sqft</span>
            </p>
            <p>
              <BedDouble color="#000000c7" size={18} /> <span>3 Bed</span>
            </p>
            <p>
              <Bath color="#000000c7" size={18} /> <span>2 Bath</span>
            </p>
          </div>
        </div>
      </div>

      <Link to={"/list"}>
        <button>See More</button>
      </Link>
    </section>
  );
};

export default FeaturedProperties;
