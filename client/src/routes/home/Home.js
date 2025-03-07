import React, { useContext } from 'react';
import './Home.scss';
import Search from '../../components/search/Search';
import { AuthContext } from '../../context/AuthContex';
import Testimonial from '../../components/testimonial/Testimonial';
import WhyUs from '../../components/whyUs/WhyUs';
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import HowWorks from '../../components/howWorks/HowWorks';



const Home = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        // <div className='home'>
        //     <div className='banner'>
        //         <div className="text">
        //             <h1>Let Your Home Be Unique <br /> & Stylist</h1>
        //             <p>A small river named Duden flows by their place and supplies it with the <br /> necessary regelialia. It is a paradisematic country, in which roasted parts of <br /> sentences fly into your mouth.</p>
        //         </div>
        //         <Search />
        //     </div>
        // </div>

        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Find Your Dream Home</h1>
                    <p>Search real estate properties in your area.</p>
                    <div className="search-bar">
                        <Search />
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <FeaturedProperties />


            {/* Why us */}
            <WhyUs />


            {/* How it works */}
            <HowWorks />
            {/* Testimonials */}
            <Testimonial />


            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2025 South Real Estate. All rights reserved.</p>
                    <p>Contact us at example@email.com</p>
                </div>
            </footer>
        </div>







    );
};

export default Home;