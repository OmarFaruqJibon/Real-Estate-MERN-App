import React, { useContext } from 'react';
import './Home.scss';
import { AuthContext } from '../../context/AuthContex';
import Search from '../../components/homepage/search/Search';
import FeaturedProperties from '../../components/homepage/featuredProperties/FeaturedProperties';
import WhyUs from '../../components/homepage/whyUs/WhyUs';
import Testimonial from '../../components/homepage/testimonial/Testimonial';
import HowWorks from '../../components/homepage/howWorks/HowWorks';
import Services from '../../components/homepage/services/Services';
import Statistics from '../../components/homepage/statistics/Statistics';
import Agent from '../../components/homepage/agent/Agent';
import Footer from '../../components/footer/Footer';

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

            {/* Our services */}
            <Services />


            {/* Featured Properties */}
            <FeaturedProperties />


            {/* Why us */}
            <WhyUs />

            {/* statistics */}
            <Statistics />



            {/* How it works */}
            <HowWorks />



            {/* Testimonials */}
            <Testimonial />


            {/* agent */}
            <Agent />



            {/* Footer */}
            <Footer />


        </div>




    );
};

export default Home;