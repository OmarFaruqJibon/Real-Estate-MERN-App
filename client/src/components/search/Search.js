import React, { useState } from 'react';
import './Search.scss';

const types = ["Buy", "Rent"];

const Search = () => {
    const [query, setQuery] = useState({
        type: "Buy",
        location: "",
        miniPrice: 0,
        maxPrice: 0
    });

    const switchType = (val) => {
        setQuery((prev) => ({ ...prev, type: val }))
    }

    return (
        <div className='searchBar'>
            <div className="type">

                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => switchType(type)}
                        className={query.type === type ? "active" : ""}
                    >{type}</button>
                ))}

            </div>







            <form className='form' action="">
                <input type="text" name="location" id="location" placeholder='Location' />

                <input type="number" name="minPrice" id="minPrice" placeholder='Minimum Price' />

                <input type="text" name="maxPrice" id="maxPrice" placeholder='Maximum Price' /> <br />

                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Search;