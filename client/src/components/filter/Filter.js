import React, { useState } from 'react';
import './filter.scss';
import { useSearchParams } from 'react-router-dom';

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

    return (
        <div className='filter'>
            <h3>Search Result for <b>{searchParams.get("city")}</b></h3>

            <div className="input-area">
                <label className="location" for="city">
                    Location
                    <input
                        id="city"
                        name="city"
                        type="text"
                        placeholder='City Location'
                        onChange={handleChange}
                        defaultValue={query.city}
                    />
                </label>

                <form action="#">
                    <label htmlFor="type">Type
                        <select
                            name="type"
                            id="type"
                            onChange={handleChange}
                            defaultValue={query.type}
                        >
                            <option value="">Select</option>
                            <option value="buy">Buy</option>
                            <option value="rent">Rent</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </label>

                    <label htmlFor="Property">Property
                        <select
                            name="Property"
                            id="Property"
                            onChange={handleChange}
                            defaultValue={query.property}
                        >
                            <option value="">Select</option>
                            <option value="apparment">Apparment</option>
                            <option value="duplex">Duplex</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                        </select>
                    </label>

                    <label htmlFor="minPrice">Min Price
                        <input
                            type="number"
                            placeholder='any'
                            name='minPrice'
                            id='minPrice'
                            onChange={handleChange}
                            defaultValue={query.minPrice}
                        />
                    </label>

                    <label htmlFor="maxPrice">Max Price
                        <input
                            type="number"
                            placeholder='any'
                            name='maxPrice'
                            id='maxPrice'
                            onChange={handleChange}
                            defaultValue={query.maxPrice}
                        />
                    </label>

                    <label htmlFor="bedroom">Bedroom
                        <input
                            type="text"
                            placeholder='any'
                            name='bedroom'
                            id='bedroom'
                            onChange={handleChange}
                            defaultValue={query.bedroom}
                        />
                    </label>


                    <button className='submit-btn' type="submit" onClick={handleFilter}>
                        <img src="https://i.postimg.cc/y6RdGGdD/search-interface-symbol.png" alt="" />
                    </button>

                </form>


            </div>
        </div>
    );
};

export default Filter;