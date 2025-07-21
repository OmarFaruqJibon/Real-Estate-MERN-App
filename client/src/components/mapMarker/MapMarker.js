import React from "react";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mapMarker.scss";
import { Link } from "react-router-dom";

const MapMarker = ({ item }) => {
  // console.log(item);

  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <Link to={`/${item.id}`} className="popup-wrapper">
          <div className="img-container">
            <img src={item?.images[0]} alt="Property" />
          </div>
          <div className="text-container">
            <p>{item.title}</p>
            <span style={{ color: "#09aa57" }}>$ {item.price}</span>
          </div>
        </Link>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
