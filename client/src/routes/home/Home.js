import React from 'react';
import './Home.scss';
import Search from '../../components/search/Search';

const Home = () => {
    return (
        <div className='home'>
            <div className='banner'>
                <div className="text">
                    {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores consequuntur numquam aut veniam deleniti quaerat voluptate quis, unde quos. Numquam </p> */}
                </div>

                <Search />
            </div>




        </div>
    );
};

export default Home;