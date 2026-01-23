import React, { useEffect, useState } from "react";
import "./FeaturedProperties.scss";
import { MapPin, Bath, BedDouble, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
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
        <p>
          Explore our curated selection of premium properties in prime locations
        </p>
      </div>

      <div className="property-list">
        {properties?.slice(0, 6).map((property) => (
          <div key={property?.id} className="property-card">
            <div className="card-image-container">
              <Link to={`/list/${property.id}`}>
                <img src={property?.images?.[0]} alt={property?.title} />
              </Link>
            </div>

            <div className="card-content">
              <Link to={`/list/${property.id}`} className="property-title-link">
                <h3>{property?.title}</h3>
              </Link>

              <div className="mid">
                <p className="location">
                  <MapPin className="icon" />
                  <span>{property?.city}</span>
                </p>

                <p className="price">SR {property?.price}</p>
              </div>

              <div className="last">
                <p>
                  <Landmark className="icon" />
                  <span>{property?.size} SQFT</span>
                </p>
                <p>
                  <BedDouble className="icon" />
                  <span>{property?.bedroom} Bed</span>
                </p>
                <p>
                  <Bath className="icon" />
                  <span>{property?.bathroom} Bath</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/list" className="see-more-link">
        <button className="see-more-btn">See More</button>
      </Link>
    </section>
  );
};

export default FeaturedProperties;
