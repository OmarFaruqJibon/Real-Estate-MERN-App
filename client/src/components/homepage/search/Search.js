// client\src\components\homepage\search\Search.js
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
            className={query.type === type ? "active" : ""}
          >
            {type} Property
          </button>
        ))}
      </div>

      <form className="form" action="">
        <div className="input-item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            placeholder="$100"
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            name="maxPrice"
            id="maxPrice"
            placeholder="$15000"
            onChange={handleChange}
          />
        </div>

        <div className="input-item-btn">
          <Link
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          >
            <input className="button" type="button" value="Search" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Search;
