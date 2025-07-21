import React, { useState } from "react";
import "./FeaturedProperties.scss";
import { MapPin, Bath, BedDouble, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import apiCall from "../../../lib/apiCall";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiCall.get("/posts");
        setProperties(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section data-aos="fade-right" className="featured-properties">
      <div className="top">
        <span className="lined-title">PROPERTY</span>
        <h1>Featured Properties</h1>
      </div>

      <div className="property-list">
        {properties?.slice(0, 6).map((property) => (
          <div className="property-card">
            <Link to={"/list"}>
              <img src={property?.images[0]} alt="Property 1" />
            </Link>
            <Link to={"/list"}>
              <h3>{property?.title}</h3>
            </Link>

            <div className="mid">
              <p>
                <MapPin color="#000000c7" size={18} />{" "}
                <span>{property?.city}</span>
              </p>
              <p
                style={{
                  color: "#0FB45F",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {property?.price}
              </p>
            </div>
            <div className="last">
              <p>
                <Landmark color="#000000c7" size={18} />{" "}
                <span>{property?.size} SQFT</span>
              </p>
              <p>
                <BedDouble color="#000000c7" size={18} />{" "}
                <span>{property?.bedroom} Bed</span>
              </p>
              <p>
                <Bath color="#000000c7" size={18} />{" "}
                <span>{property?.bathroom} Bath</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link to={"/list"}>
        <button>See More</button>
      </Link>
    </section>
  );
};

export default FeaturedProperties;
