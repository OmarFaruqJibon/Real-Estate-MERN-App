import "./Home.scss";
import Search from "../../components/homepage/search/Search";
import FeaturedProperties from "../../components/homepage/featuredProperties/FeaturedProperties";
import WhyUs from "../../components/homepage/whyUs/WhyUs";
import Testimonial from "../../components/homepage/testimonial/Testimonial";
import HowWorks from "../../components/homepage/howWorks/HowWorks";
import Services from "../../components/homepage/services/Services";
import Statistics from "../../components/homepage/statistics/Statistics";
import Agent from "../../components/homepage/agent/Agent";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Find Your Dream Home</h1>
          <p>Search real estate properties in your area</p>
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
