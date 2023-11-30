import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const testimonials = [
  {
    content:
      "EZ Stock Trader has transformed my approach to investing. The insights provided are invaluable, and I've seen significant growth in my portfolio." ,
    name:"Ganesh",
    role: "Customer",
    img:ava01
  },
  {
    content:
      "Adopting EZ Stock Trader was a game-changer for me. The real-time updates and tailored resources have made my investment decisions more informed and confident.",
    name:"Vennela",
    role: "Customer",
    img:ava02
  },
  {
    content:
      "My experience with EZ Stock Trader has been fantastic. The streamlined analysis tools and educational materials have enhanced my financial knowledge and performance.",
    name: "Pawan",
    role: "Customer",
    img:ava03
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    
    <Slider {...settings}>
     { testimonials.map((testimonial, index) => (
        <div key={index} className="testimonial py-4 px-3">
          <p>{testimonial.content}</p>
          <div className="d-flex align-items-center gap-4 mt-3">
            <img src={testimonial.img} className="w-25 h-20 rounded-circle" alt="" />
            <div>
              <h6 className="mb-0 mt-3">{testimonial.name}</h6>
              <p>{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
