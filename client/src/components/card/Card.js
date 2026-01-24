// client\src\components\card\Card.js
import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";
import { Bed, Bath, Square, Calendar } from "lucide-react";

const Card = ({ item, viewMode = "list" }) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={`card ${viewMode}`}>
      <div className="cardImage">
        <Link to={`/list/${item.id}`}>
          <img src={item?.images[0]} alt={item?.title} loading="lazy" />
          <div className="imageOverlay">
            <span className="priceBadge">SR {item?.price}</span>
          </div>
        </Link>
      </div>

      <div className="cardContent">
        <div className="cardHeader">
          <Link to={`/list/${item.id}`} className="cardTitleLink">
            <h3 className="cardTitle">{item?.title}</h3>
          </Link>
          <p className="cardAddress">
            <span className="locationIcon">📍</span>
            {item?.address}
          </p>
        </div>

        <div className="cardFeatures">
          <div className="featureItem">
            <Bed size={18} />
            <span>{item?.bedroom} Bed</span>
          </div>
          <div className="featureItem">
            <Bath size={18} />
            <span>{item?.bathroom} Bath</span>
          </div>
          <div className="featureItem">
            <Square size={18} />
            <span>{item?.size} sqft</span>
          </div>
        </div>

        <div className="cardFooter">
          <div className="dateInfo">
            <Calendar size={16} />
            <span>Listed: {formattedDate}</span>
          </div>
          <Link to={`/list/${item.id}`} className="viewDetailsBtn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
