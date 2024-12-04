import { useEffect, useState } from "react";
import { useCart, useLogin, useUser } from "../Layout/Layout";
import axios from "axios";

export const BuyProduct = ({ cart, setCart, adminDetail }) => {
  const { user, setUser } = useUser();
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [orderTotalAmount, setOrderTotalAmount] = useState(15);
  const [order, setOrder] = useState([]);
  const [orderedAmt, setOrderAmt] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const storedLogin = localStorage.getItem("login");
  const [login, setLogin] = useState(false);
  const [latitudeDeliver, setLatitudeDeliver] = useState();
  const [longitudeDeliver, setLongitudeDeliver] = useState();
  const [deliverLocation, setDeliverLocation] = useState({});

  useEffect(() => {
    const deliverDetails = {
      items: order,
      DeliverLocation: deliverLocation,
      OrderAmount: orderedAmt,
      PersonInformation: user,
    };
    if (order.length > 0) {
      axios
        .post(
          "http://127.0.0.1:2081/newbashyalgeneralstore/orderedItems",
          deliverDetails
        )
        .then((result) => {
          showSuccessFunction();
          // console.log(result);
          setCart([]);
        })
        .catch((err) => {
          alert("Failed to order items");
          setOrder([]);
          setOrderAmt(0);
        });
    }
  }, [order]);

  useEffect(() => {
    setDeliverLocation({
      ["latitudeDeliver"]: latitudeDeliver,
      ["longitudeDeliver"]: longitudeDeliver,
    });
  }, [latitudeDeliver]);

  const getUserLocation = () => {
    const location = document.getElementById("locationDelivery");
    location.innerHTML = "<h5>DONE!</h5>";

    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      setLatitudeDeliver(position.coords.latitude);
      setLongitudeDeliver(position.coords.longitude);
    }
  };

  useEffect(() => {
    setLogin(JSON.parse(storedLogin));
    const totalAmount = cart.reduce((total, product) => {
      return total + product.ProductAmount;
    }, 0);
    setCartTotalAmount(totalAmount);
    setOrderTotalAmount(
      (adminDetail.minOrder > totalAmount ? 15 : 0) + totalAmount
    );
  }, [cart]); // Recalculate total when cart changes

  const showSuccessFunction = () => {
    const interval = setInterval(() => {
      setShowSuccess(true);
    }, 500);

    // Stop the interval after 3 seconds
    setTimeout(() => {
      clearInterval(interval);
      setShowSuccess(false);
    }, 3000);
  };

  const handleConfirmOrder = async () => {
    setOrder([...cart]);
    setOrderAmt(orderTotalAmount);

    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when clicking close
  };
  return (
    <>
      <div className="buy-section mt-5">
        <div className="col-md-5 col-lg-4 order-md-last mx-auto">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-body-secondary fs-1">shopping cart</span>
            <span className="badge bg-secondary rounded-pill">
              {cart.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cart.map((product, index) => (
              <li
                className="fs-4 list-group-item d-flex justify-content-between lh-sm"
                key={index}
              >
                <div>
                  <p className="my-0">{product.name}</p>
                  <small className="text-body-secondary">
                    Quantity: {product.quantity}
                  </small>
                </div>
                <span className="text-body-secondary">
                  Rs {product.ProductAmount}
                </span>
              </li>
            ))}

            <li className="fs-4 list-group-item d-flex justify-content-between">
              <span>Total Product Amount (NPR)</span>
              <strong>Rs {cartTotalAmount}</strong>
            </li>
            <li className="fs-4 list-group-item d-flex justify-content-between">
              <span>Delivery Charge (NPR)</span>
              <strong>Rs {orderTotalAmount - cartTotalAmount}</strong>
            </li>
            <li className="fs-4 list-group-item d-flex justify-content-between">
              <span>Total Amount (NPR)</span>
              <strong>Rs {orderTotalAmount}</strong>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary btn-lg fs-4 w-100"
            onClick={() => setShowModal(true)}
          >
            Place Order
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Add to Cart</h3>
            <p className="fs-3">
              {login
                ? "Do you really want to place order(Items must be in cart to order items)"
                : "You have to Login first"}
            </p>
            {login && (
              <div className="location mb-5" id="locationDelivery">
                <button
                  type="button"
                  className="btn btn-outline-dark fs-5"
                  onClick={getUserLocation}
                  id="location-button"
                  required
                >
                  Location To Deliver (Required)
                </button>
              </div>
            )}
            <button className="btn btn-primary fs-3" onClick={closeModal}>
              Close
            </button>
            {login && latitudeDeliver && cart.length > 0 && (
              <button
                className="btn btn-primary ms-5 fs-3"
                onClick={handleConfirmOrder}
              >
                Yes
              </button>
            )}
          </div>
        </div>
      )}
      {showSuccess && (
        <div
          className="p-3 mb-2 bg-success text-white w-25 fs-3 "
          style={{
            position: "absolute",
            top: 100,
            right: "1%",
            minWidth: "200px",
            borderRadius: "10px",
          }}
        >
          Successfully Purchased!
        </div>
      )}

      <div className="buy-section mt-5 pt-5">
        <div className="col-md-5 col-lg-4 order-md-last mx-auto">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-body-dark fs-1">Ordered Items</span>
            <span className="badge bg-secondary rounded-pill">
              {order.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {order.map((product, index) => (
              <li
                className="fs-4 list-group-item d-flex justify-content-between  lh-sm"
                key={index}
              >
                <div>
                  <p className="my-0">{product.name}</p>
                  <small className="text-body-secondary">
                    Quantity: {product.quantity}
                  </small>
                </div>
                <span className="text-body-secondary">
                  Rs {product.ProductAmount}
                </span>
              </li>
            ))}

            <li className="fs-4 list-group-item d-flex justify-content-between">
              <span>Total (NPR)</span>
              <strong>Rs {orderedAmt}</strong>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
