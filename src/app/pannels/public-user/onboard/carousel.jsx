import React from "react";

const CarouselComponent = () => {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="carousel-parent">
            <img
              src="/assets/images/candidates/pic1.jpg"
              className="w-30 rounded-circle img-fixed"
              alt="Slide 1"
            />
            <span className="text-xl text-gray block">Issac Kumi</span>
            <span className="text-sm text-gray block">UX/UI</span>
            <div className="d-flex-row">
              <span className="text-sm">5.0</span>
              <span className="text-sm">GH50.0</span>
              <span className="text-sm">GH50.0</span>
            </div>
            <span className="text-gray">
              Yeshub has enabled me to build a professional career I love while
              living a life I love while constantly developing new skills.
            </span>
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-parent">
            <img
              src="/assets/images/candidates/pic1.jpg"
              className="w-30 rounded-circle img-fixed"
              alt="Slide 2"
            />
            <span className="text-xl text-gray block">Issac Kumi</span>
            <span className="text-sm text-gray block">UX/UI</span>
            <div className="d-flex-row">
              <span className="text-sm">5.0</span>
              <span className="text-sm">GH50.0</span>
              <span className="text-sm">GH50.0</span>
            </div>
            <span className="text-gray">
              Yeshub has enabled me to build a professional career I love while
              living a life I love while constantly developing new skills.
            </span>
          </div>
        </div>
        <div className="carousel-item">
          <div className="carousel-parent">
            <img
              src="/assets/images/candidates/pic1.jpg"
              className="w-30 rounded-circle img-fixed"
              alt="Slide 3"
            />
            <span className="text-xl text-gray block">Issac Kumi</span>
            <span className="text-sm text-gray block">UX/UI</span>
            <div className="d-flex-row">
              <span className="text-sm">5.0</span>
              <span className="text-sm">GH50.0</span>
              <span className="text-sm">GH50.0</span>
            </div>
            <span className="text-gray">
              Yeshub has enabled me to build a professional career I love while
              living a life I love while constantly developing new skills.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default CarouselComponent;
