import React from "react";
import "./Testimonial.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    review: "It helped me land my dream job! Mock interviews were spot on.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    review: "The resume builder is amazing! It saved me so much time.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Johnson",
    review: "The AI-generated cover letters are really helpful to me.",
    rating: 3,
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Emily Davis",
    review: "This platform boosted my confidence for interviews truly!",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    name: "David Lee",
    review: "Super easy to use and very effective. Highly recommended!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/61.jpg",
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
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-img"
              />
              <p className="testimonial-text">"{testimonial.review}"</p>
              <div className="testimonial-stars">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} fill="#09aa57" stroke="none" size={20} />
                ))}
              </div>
              <span className="testimonial-name">- {testimonial.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
