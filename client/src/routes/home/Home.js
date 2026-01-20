// client\src\routes\home\Home.js
import { useEffect, useState } from "react";
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
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ScrollToTop from "../../components/common/ScrollToTop";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <>
      <div className="homepage">
        {/* Hero Section */}
        <section className="hero" id="hero">
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-content">
                <div className="hero-badge">Trusted by 10,000+ Clients</div>
                <h1 className="hero-title">
                  Find Your <span className="highlight">Dream Home</span>
                </h1>
                <p className="hero-subtitle">
                  Discover perfect real estate properties in your preferred area
                </p>
                <div className="hero-search">
                  <Search />
                </div>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">5,000+</span>
                    <span className="stat-label">Properties</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <Services />

        {/* Featured Properties */}
        <FeaturedProperties />

        {/* Why Choose Us */}
        <WhyUs />

        {/* Statistics */}
        <Statistics />

        {/* How It Works */}
        <HowWorks />

        {/* Testimonials */}
        <Testimonial />

        {/* Agents */}
        <Agent />

        {/* Footer */}
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
};

export default Home;
