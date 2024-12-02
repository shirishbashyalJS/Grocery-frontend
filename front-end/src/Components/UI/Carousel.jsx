import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Carousel = () => {
  return (
    <section className="carousel-body ">
      <div
        id="carouselExampleDark"
        className="carousel carousel-bright slide carousel-entire-body"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="1000">
            <img
              src="../../../images/shop-1.jpg"
              className="d-block w-100 carousel-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="../../../images/shop-2.jpg"
              className="d-block w-100  carousel-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="../../../images/shop-3.jpg"
              className="d-block w-100  carousel-img"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
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
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="gradient-carousel"></div>

        <div className="carousel-content">
          <p>Welcome To Online Grocery Store</p>
          <p>
            Let's Get Started..
            <a href="#bestitems">
              <FaArrowCircleRight style={{ color: "white" }} />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
