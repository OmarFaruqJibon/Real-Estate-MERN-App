import React from "react";
import "./Testimonial.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    review:
      "I posted my property easily and got quick responses. Simple and effective platform!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Tanvir Hossain",
    review:
      "Love the clean dashboard. Tracking my listings and approval status is super smooth.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Nadia Karim",
    review:
      "Great experience! The approval process was fast and I could manage my posts in one place.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    name: "Fahim Ahmed",
    review:
      "As a developer, managing posts and user roles from the admin panel was very convenient.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/30.jpg",
  },
  {
    name: "Mehzabin Alam",
    review:
      "User-friendly interface. I found a perfect flat to rent within a few days. Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/49.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="testimonial-container">
      <div className="top">
        <span className="lined-title">TESTIMONIAL</span>
        <h1>What Our Users Say</h1>
      </div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3} // Show 3 testimonials at a time
        slidesPerGroup={1} // Slide one by one
        loop={true} // Ensures infinite loop
        loopFillGroupWithBlank={true} // Fix stopping issue
        centeredSlides={false} // Prevent shifting
        autoplay={{
          delay: 2500, // Slide every 2.5 seconds
          disableOnInteraction: false, // Continue autoplay after manual swipe
        }}
        speed={800} // Smooth transition speed
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          320: { slidesPerView: 1, slidesPerGroup: 1 },
          768: { slidesPerView: 2, slidesPerGroup: 1 },
          1024: { slidesPerView: 3, slidesPerGroup: 1 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <img
                src={testimonial?.image}
                alt={testimonial?.name}
                className="testimonial-img"
              />
              <p className="testimonial-text">"{testimonial?.review}"</p>
              <div className="testimonial-stars">
                {Array.from({ length: testimonial?.rating }, (_, i) => (
                  <Star key={i} fill="#ffb92a" stroke="none" size={20} />
                ))}
              </div>
              <span className="testimonial-name">- {testimonial?.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
