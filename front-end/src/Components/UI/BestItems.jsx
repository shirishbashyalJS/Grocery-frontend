import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const BestItems = ({ bestItems }) => {
  const [i, setI] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5); // Number of items to show at a time

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setItemsToShow(1); // Extra small devices
      } else if (width < 768) {
        setItemsToShow(2); // Small devices
      } else if (width < 992) {
        setItemsToShow(3); // Medium devices
      } else {
        setItemsToShow(5); // Large devices
      }
    };

    updateItemsToShow(); // Set initial value
    window.addEventListener("resize", updateItemsToShow); // Update on resize

    return () => {
      window.removeEventListener("resize", updateItemsToShow); // Clean up
    };
  }, []);

  // Function to get visible items based on the current index
  const getVisibleItems = () => {
    const length = bestItems.length;
    return Array.from(
      { length: itemsToShow },
      (_, index) => bestItems[(i + index) % length]
    );
  };

  const handleNext = () => {
    setI((prevIndex) => (prevIndex + itemsToShow) % bestItems.length);
  };

  const handlePrev = () => {
    setI(
      (prevIndex) =>
        (prevIndex - itemsToShow + bestItems.length) % bestItems.length
    );
  };

  // Get visible items based on the current index
  const visibleItems = getVisibleItems();

  return (
    <section id="bestitems-section">
      <div className="items-title">
        <p>Best Sales</p>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="card-wrapper container-sm d-flex justify-content-around">
              {visibleItems.map((item, index) => (
                <div
                  className="card best-items-card"
                  style={{ width: 180 }}
                  key={index}
                >
                  <NavLink
                    to={`/product/${item.name}`}
                    key={index}
                    className="bestitems-link"
                  >
                    <img src={item.image} className="card-img-top" alt="..." />
                    <div className="card-body best-card-text">
                      <h5 className="card-title">{item.name}</h5>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          onClick={handlePrev}
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
          onClick={handleNext}
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};
