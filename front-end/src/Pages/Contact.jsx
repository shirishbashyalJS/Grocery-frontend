import { NavLink } from "react-router-dom";

export const Contact = () => {
  return (
    <section
      className="contact d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">
          New Bashyal General Store
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Welcome to our online grocery store, where convenience meets
            freshness! 🌟 Discover a wide selection of quality products,
            delivered right to your doorstep. From farm-fresh produce to pantry
            staples, we’re here to make your shopping experience delightful and
            hassle-free. Enjoy exploring our vibrant offerings and savor the joy
            of cooking with the best ingredients! 🥦🥖✨
          </p>

          <div className="contact-information">
            <h1>Contact Us</h1>
            <p className="fs-4">
              <span className="text-secondary">Gmail: </span>{" "}
              shirisjbasjyal@gmail.com
            </p>
            <p className="fs-4">
              <span className="text-secondary">Contact Number: </span>
              +977-9802464310
            </p>
          </div>
        </div>
        <NavLink to="/">
          <button type="button" className="btn btn-outline-dark ms-5">
            Go Back
          </button>
        </NavLink>
      </div>
    </section>
  );
};
