import React from 'react';

const Filter = () => {
    return (
        <div className='filter'>
            <h3>Search Result for <b>London</b></h3>
            <div className="input-area">

                <label class="location" for="city">
                    Location
                    <input id="city" name="city" type="text" placeholder='City Location' />
                </label>

                <form action="#">
                    <label for="lang">Type
                        <select name="languages" id="lang">
                            <option value="javascript">Rent</option>
                            <option value="php">Buy</option>
                            <option value="java">Ex</option>
                        </select>
                    </label>

                    <label for="lang">Property
                        <select name="languages" id="lang">
                            <option value="javascript">Any</option>
                            <option value="php">PHP</option>
                            <option value="java">Java</option>
                        </select>
                    </label>

                    <label for="lang">Min Price
                        <input type="number" placeholder='any' />
                    </label>

                    <label for="lang">Max Price
                        <input type="number" placeholder='any' />
                    </label>

                    <label for="lang">Bedroom
                        <input type="text" placeholder='any' />
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