import React, { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  const handleReset = () => {
    const clearedQuery = {
      type: "",
      city: "",
      property: "",
      minPrice: "",
      maxPrice: "",
      bedroom: "",
    };
    setQuery(clearedQuery);
    setSearchParams({});
  };

  return (
    <div className="filter">
      <h4>Search for property</h4>

      <div className="input-area">
        <label className="location" htmlFor="city">
          Location
          <input
            id="city"
            name="city"
            type="text"
            placeholder="City Location"
            onChange={handleChange}
            value={query.city}
          />
        </label>

        {/* Use form with onSubmit to prevent reload */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleFilter();
          }}
        >
          <label htmlFor="type">
            Type
            <select
              name="type"
              id="type"
              onChange={handleChange}
              value={query.type}
            >
              <option value="">Select</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="commercial">Commercial</option>
            </select>
          </label>

          <label htmlFor="property">
            Property Category
            <select
              name="property"
              id="property"
              onChange={handleChange}
              value={query.property}
            >
              <option value="">Select</option>
              <option value="apartment">Apartment</option>
              <option value="duplex">Duplex</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
            </select>
          </label>

          <label htmlFor="minPrice">
            Price
            <div className="price-group">
              <input
                type="number"
                placeholder="Min"
                name="minPrice"
                id="minPrice"
                onChange={handleChange}
                value={query.minPrice}
              />

              <input
                type="number"
                placeholder="Max "
                name="maxPrice"
                id="maxPrice"
                onChange={handleChange}
                value={query.maxPrice}
              />
            </div>
          </label>

          <label htmlFor="bedroom">
            Bedroom
            <input
              type="text"
              placeholder="any"
              name="bedroom"
              id="bedroom"
              onChange={handleChange}
              value={query.bedroom}
            />
          </label>

          <div className="btn-group">
            <button className="submit-btn" type="submit">
              Search
            </button>

            <button className="reset-btn" type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
