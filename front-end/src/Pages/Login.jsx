import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { useLogin, useUser } from "../Components/Layout/Layout";

export const Login = () => {
  const { user, setUser } = useUser();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const { login, setLogin } = useLogin();

  // const [login, setLogin] = useState(false);
  const [errors, setErrors] = useState({}); // State to track validation errors

  const handleLogout = () => {
    setLogin(false);
    console.log("Logged out");
    localStorage.setItem("login", false); // Store login state as false
    setUser({});
    localStorage.clear("user");
    window.open("/", "_self");
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
    const storedLogin = localStorage.getItem("login");
    if (storedLogin === "true") {
      setLogin(true);
    }
    // console.log(login);
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
    if (!user.fname) newErrors.fname = "First name is required.";
    if (!user.lname) newErrors.lname = "Last name is required.";
    if (!user.email) newErrors.email = "Email is required.";
    if (!user.password) newErrors.password = "Password is required.";
    if (!user.address) newErrors.address = "Address is required.";
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

      window.open("/", "_self");
    } else {
      // Show modal if there are errors
      const modal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modal.show();
    }
    // window.open("/");
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
            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="firstName">First name</label>
                <input
                  onChange={handleInputChange}
                  name="fname"
                  type="text"
                  className="form-control fs-5"
                  id="firstName"
                  required
                />
                <div className="invalid-feedback">{errors.fname}</div>
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control fs-5"
                  onChange={handleInputChange}
                  name="lname"
                  id="lastName"
                  required
                />
                <div className="invalid-feedback">{errors.lname}</div>
              </div>
            </div>

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
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control fs-5"
                id="address"
                onChange={handleInputChange}
                name="address"
                placeholder="1234 Main St"
                required
              />
              <div className="invalid-feedback">{errors.address}</div>
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
                Sign Up
              </button>
            </div>
          </form>
          <div className="signin">
            <NavLink to="/signin" style={{ color: "black" }}>
              Already havean account
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
