import React from "react";
import "./card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  // console.log(item);
  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="single-card">
      <div className="img-container">
        <Link to={`/list/${item.id}`}>
          <img src={item?.images[0]} alt="Property" />
        </Link>
      </div>

      <div className="text-container">
        <Link to={`/list/${item.id}`}>
          <h3 className="item-title">{item?.title}</h3>
        </Link>

        <p className="item-location">
          <img
            src="https://i.postimg.cc/mg8RNbwp/location.png"
            alt="location"
          />
          <span>{item?.address}</span>
        </p>

        <div className="price-date">
          <h3 className="item-price">SR {item?.price}</h3>

          <p className="date">{formattedDate}</p>
        </div>

        <div className="bottom-info">
          <div className="rooms">
            <p>
              <img
                src="https://i.postimg.cc/T14h90rB/bed-1.png"
                alt="bedroom"
              />
              <span>{item?.bedroom} Bed</span>
            </p>

            <p>
              <img
                src="https://i.postimg.cc/ZRYRz2H1/bathroom-1.png"
                alt="bathroom"
              />
              <span>{item?.bathroom} Bath</span>
            </p>

            <p>
              <img src="https://i.postimg.cc/zD6r0tT5/room.png" alt="" />
              <span>{item?.size} sqft</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
