import React, { useState } from 'react';
import './Search.scss';
import { Link } from 'react-router-dom';

const types = ["buy", "rent"];

const Search = () => {
    const [query, setQuery] = useState({
        type: "buy",
        city: "",
        minPrice: 0,
        maxPrice: 0,
    });

    const switchType = (val) => {
        setQuery((prev) => ({ ...prev, type: val }))
    }

    const handleChange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className='searchBar'>
            <div className="type">

                {types?.map((type) => (
                    <button
                        key={type}
                        onClick={() => switchType(type)}
                        className={query.type === type ? "active" : ""}
                    >{type}</button>
                ))}

            </div>

            <form className='form' action="">
                <input type="text" name="city" id="city" placeholder='City' onChange={handleChange} />

                <input type="number" name="minPrice" id="minPrice" placeholder='Minimum Price' onChange={handleChange} />

                <input type="text" name="maxPrice" id="maxPrice" placeholder='Maximum Price' onChange={handleChange} /> <br />

                <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                >
                    <button> Search </button>
                </Link>

            </form>
        </div>
    );
};

export default Search;