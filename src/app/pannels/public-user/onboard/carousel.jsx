import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CarouselComponent = () => {
  useEffect(() => {
    const carouselEl = document.querySelector('#carouselExample');
    if (carouselEl && window.bootstrap) {
      new window.bootstrap.Carousel(carouselEl);
    }
  }, []);

  const slides = [1, 2, 3];

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, idx) => (
          <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
            <div className="text-center p-4">
              <img
                src="https://i.postimg.cc/cHz0fqgZ/image-boy-434.jpg"
                className="rounded-circle"
                alt={`Slide ${slide}`}
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <div className="mt-3">
                <span className="h5 d-block text-dark">Issac Kumi</span>
                <span className="text-muted d-block">UX/UI</span>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-2">
                <span className="text-sm">5.0</span>
                <span className="text-sm">GH50.0</span>
                <span className="text-sm">GH50.0</span>
              </div>
              <p className="text-secondary mt-3">
                Yeshub has enabled me to build a professional career I love while
                living a life I love while constantly developing new skills.
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
