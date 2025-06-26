import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const data=[
    {
      id: 1,
      name: "Issac Kumi",
      role: "UX/UI",
      rating: 5.0,
      price: 50.0,
      image: "https://i.postimg.cc/cHz0fqgZ/image-boy-434.jpg",
      testimonial: "Yeshub has enabled me to build a professional career I love while living a life I love while constantly developing new skills.",
    },
    {
      id: 2,
      name: "Ama Boateng",
      role: "Data Analyst",
      rating: 4.9,
      price: 60.0,
      image: "https://i.postimg.cc/7YWrH9VK/image-boy-434-Madam.jpg",
      testimonial: "YesHub completely transformed my job search. As a Data Analyst, I was looking for flexible, remote opportunities that matched my skills and interests—and YesHub delivered.",
    },
    
  ]
const CarouselComponent = () => {
 useEffect(() => {
    const carouselEl = document.querySelector('#carouselExample');
    if (carouselEl && window.bootstrap) {
      new window.bootstrap.Carousel(carouselEl);
    }
  }, [data]);

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
            {data.map((item, idx) => (
          <div key={item.id || idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
            <div className="text-center p-4">
              <img
                src={item.image}
                className="rounded-circle"
                alt={item.name}
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <div className="mt-3">
                <span className="h5 d-block text-dark">{item.name}</span>
                <span className="text-muted d-block">{item.role}</span>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-2">
                <span className="text-sm">{item.rating}</span>
                <span className="text-sm">GH{item.price}</span>
                <span className="text-sm">GH{item.price}</span>
              </div>
              <p className="text-secondary mt-3">
                {item.testimonial}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </div>
  );
};

export default CarouselComponent;
