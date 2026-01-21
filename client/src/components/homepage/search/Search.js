import React, { useState } from "react";
import "./Search.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

const Search = () => {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types?.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`type-btn ${query.type === type ? "active" : ""}`}
          >
            {type} Property
          </button>
        ))}
      </div>

      <form className="form">
        <div className="input-row">
          <div className="input-item">
            <label htmlFor="city">Location</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City Location"
              onChange={handleChange}
            />
          </div>

          <div className="input-item">
            <label htmlFor="minPrice">Min Price</label>
            <div className="price-input">
              <span className="currency">$</span>
              <input
                type="number"
                name="minPrice"
                id="minPrice"
                placeholder="100"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-item">
            <label htmlFor="maxPrice">Max Price</label>
            <div className="price-input">
              <span className="currency">$</span>
              <input
                type="number"
                name="maxPrice"
                id="maxPrice"
                placeholder="15000"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-item-btn">
            <Link
              to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
            >
              <button className="search-btn">Search</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
