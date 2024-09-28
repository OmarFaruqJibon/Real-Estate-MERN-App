import React from 'react';
import './filter.scss';

const Filter = () => {
    return (
        <div className='filter'>
            <h3>Search Result for <b>London</b></h3>
            <div className="input-area">

                <label className="location" for="city">
                    Location
                    <input id="city" name="city" type="text" placeholder='City Location' />
                </label>

                <form action="#">
                    <label htmlFor="type">Type
                        <select name="type" id="type">
                            <option value="">Select</option>
                            <option value="buy">Buy</option>
                            <option value="rent">Rent</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </label>

                    <label htmlFor="Property">Property
                        <select name="Property" id="Property">
                            <option value="">Select</option>
                            <option value="apparment">Apparment</option>
                            <option value="duplex">Duplex</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                        </select>
                    </label>

                    <label htmlFor="minPrice">Min Price
                        <input type="number" placeholder='any' name='minPrice' id='minPrice' />
                    </label>

                    <label htmlFor="maxPrice">Max Price
                        <input type="number" placeholder='any' name='maxPrice' id='maxPrice' />
                    </label>

                    <label htmlFor="bedroom">Bedroom
                        <input type="text" placeholder='any' name='bedroom' id='bedroom' />
                    </label>


                    <button className='submit-btn' type="submit">
                        <img src="https://i.postimg.cc/y6RdGGdD/search-interface-symbol.png" alt="" />
                    </button>

                </form>


            </div>
        </div>
    );
};

export default Filter;