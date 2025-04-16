import React from "react";

const slides = [
  {
    title: "Meet Global’s Top VCs",
    image: "/images/vc.jpg",
  },
  {
    title: "Learn from Top Startup Founders",
    image: "/images/founders.jpg",
  },
  {
    title: "Connect with Tech enterprises",
    image: "/images/tech.jpg",
  },
];

const TngssCarousel = () => {
  return (
    <section
      className="position-relative p-4 rounded"
      style={{
        minHeight: "500px",
        background: "linear-gradient(to bottom right, #e7efff, #fff1e8)",
        overflow: "hidden",
      }}
    >
      {/* Vertical Text */}
      <div
        className="position-absolute"
        style={{
          transform: "rotate(-90deg)",
          left: "-8rem",
          top: "50%",
          transformOrigin: "left",
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#000",
        }}
      >
        TNGSS Week · A must have for Startups
      </div>

      {/* Curve Accent */}
      <div
        className="position-absolute bg-black rounded-start-pill"
        style={{
          left: "10rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: "15rem",
          height: "24rem",
          zIndex: 0,
        }}
      />

      {/* Bootstrap Carousel */}
      <div className="ms-5 ps-5 position-relative z-1">
        <div
          id="tngssCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {slides.map((slide, idx) => (
              <div
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                key={idx}
              >
                <div className="card shadow rounded-4 overflow-hidden">
                  <img
                    src={slide.image}
                    className="d-block w-100"
                    alt={slide.title}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div
                    className="card-img-overlay d-flex align-items-end p-3"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    }}
                  >
                    <h5 className="text-white mb-0">{slide.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#tngssCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#tngssCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TngssCarousel;
