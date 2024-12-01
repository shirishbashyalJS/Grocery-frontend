import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLogin, useUser } from "../Components/Layout/Layout";

export const Signin = () => {
  const { user, setUser } = useUser();
  const [latitude, setLatitude] = useState();
  const { login, setLogin } = useLogin();
  // const [login, setLogin] = useState(false);
  const [longitude, setLongitude] = useState();
  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleLogout = () => {
    setLogin(false);
    localStorage.setItem("login", false); // Store login state as false
    console.log("Logged out");
    setUser({});

    localStorage.clear("user");
  };

  const getUserLocation = () => {
    const location = document.getElementById("location");
    location.innerHTML = "<h5>DONE!</h5>";

    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }
  };

  useEffect(() => {
    // console.log(login);
    const storedLogin = localStorage.getItem("login");
    if (storedLogin === "true") {
      setLogin(true);
    }
  }, [login, setLogin]);

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  const handleInputChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" })); // Clear error on input change
  };

  const validateForm = () => {
    const newErrors = {};

    if (!user.email) newErrors.email = "Email is required.";
    if (!user.password) newErrors.password = "Password is required.";
    if (!user.contact) newErrors.contact = "Contact number is required";
    if (!latitude) newErrors.location = "Location is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLogin(true);
      localStorage.setItem("login", true); // Store login state as true
      console.log("User data:", user); // Proceed with valid data
      document.getElementById("submit").innerHTML = "Successful"; // Change button text on success
      // window.open("/", "_self");
    } else {
      // Show modal if there are errors
      const modal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modal.show();
    }
  };

  return (
    <section className="login" id="login">
      <NavLink to="/">
        <button type="button" className="btn btn-outline-dark ms-5">
          Go Back
        </button>
      </NavLink>
      {!login && (
        <div className="col-md-8 order-md-1 container">
          <h4 className="mb-3 items-title">Signup & Billing address</h4>
          <form
            className="needs-validation was-validated fs-5 mt-5 gy-5"
            noValidate=""
          >
            <div className="mb-4">
              <label htmlFor="email">
                Email <span className="text-muted">(Mandatory)</span>
              </label>
              <input
                type="email"
                className="form-control fs-5"
                id="email"
                onChange={handleInputChange}
                name="email"
                placeholder="you@example.com"
                required
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="mb-4">
              <label htmlFor="password">
                Password <span className="text-muted fs-5">(Mandatory)</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleInputChange}
                name="password"
                required
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <div className="mb-4">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="text"
                className="form-control fs-5"
                id="contact"
                onChange={handleInputChange}
                name="contact"
                placeholder="98024....."
                required
              />
              <div className="invalid-feedback">{errors.contact}</div>
            </div>

            <div className="location mb-5" id="location">
              <button
                type="button"
                className="btn btn-outline-dark fs-5"
                onClick={getUserLocation}
                id="location-button"
                required
              >
                Provide Google Location
              </button>
              <div className="invalid-feedback">{errors.location}</div>
            </div>

            <hr className="mb-5" />
            <div className="submit-btn-div d-flex justify-content-center">
              <button
                id="submit"
                className="btn btn-outline-dark btn-lg fs-3"
                type="submit"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="signin">
            <NavLink to="/login" style={{ color: "black" }}>
              Don't have account
            </NavLink>
          </div>
        </div>
      )}
      {login && (
        <div
          style={{
            height: "75vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p className="fs-1" style={{}}>
            You has successfully login.
          </p>
          <button
            className="btn btn-outline-dark btn-lg"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
      {/* <!-- Modal --> */}
      <div
        className="modal fade mt-5"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Submit Error
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body fs-3">
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
