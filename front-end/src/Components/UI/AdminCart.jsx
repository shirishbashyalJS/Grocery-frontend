import { useEffect, useRef, useState } from "react";
import { useCart } from "../Layout/Layout";
import axios from "axios";

export const AdminCart = ({ adminDetail, adminUrl }) => {
  const { cart, setCart } = useCart();
  const [order, setOrder] = useState();
  const [changeAdminDetail, setChangeAdminDetail] = useState(adminDetail);
  const [settingVisible, setSettingVisible] = useState(false);
  const [adminVisible, setAdminVisible] = useState(false);
  const orderItemsUrl =
    "http://localhost:2081/newbashyalgeneralstore/orderedItems/";

  const handleCustomerLocation = (lat, lon) => {
    window.open(`https://maps.google.com/?q= + ${lat}  + ${lon}`);
  };

  const handleCompleted = async (id) => {
    const confirm = prompt("Enter 'confirm' to confirm the complete order.");
    if (confirm === "confirm") {
      try {
        await axios.delete(`${orderItemsUrl}${id}`);
        alert("Order deleted successfully!");
        setOrder(order.filter((ord) => ord._id !== id));
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Order confirmation regected!");
    }
  };
  useEffect(() => {
    axios.get(orderItemsUrl).then((responce) => {
      setOrder(responce.data);
    });
  }, []);

  const handleAdminChanges = (e) => {
    e.preventDefault();
    const password = prompt(
      "If Password Changed: Enter New Password. Else: Enter Exisisting Password"
    );
    if (password == changeAdminDetail.admin.password) {
      axios
        .put(adminUrl + "/" + changeAdminDetail._id, changeAdminDetail)
        .then((result) => {
          alert(JSON.stringify(result.data));
        })
        .catch((err) => console.log(err));
    } else {
      alert("Remember The Password Carefully:)");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "username" || name == "password") {
      setChangeAdminDetail((prevDetail) => ({
        ...prevDetail,

        admin: {
          ...prevDetail.admin,
          [name]: value,
        },
      }));
    } else {
      setChangeAdminDetail((prevDetail) => ({
        ...prevDetail,
        [name]: value,
      }));
    }
  };
  return (
    <div className="added-cart-items container pb-5 pt-5 ">
      <p className="items-title">
        Order Items<span>({order && order.length})</span>
      </p>

      {order &&
        order.map((product) => {
          return (
            <div
              className="card mb-3 p-3 mx-auto "
              style={{ maxWidth: "540px" }}
              key={product._id}
            >
              <div className="personal-detail ms-5">
                <p className="personal-header fs-1">Person Information</p>
                <p className="email fs-4">
                  Email: {product.PersonInformation.email}
                </p>
                <p className="contact fs-4">
                  Contact: {product.PersonInformation.contact}
                </p>
                <p className="latitude fs-4">
                  Latitude: {product.PersonInformation.latitude}
                </p>
                <p className="longitude fs-4">
                  Longitude: {product.PersonInformation.longitude}
                </p>
              </div>
              <div className="delivery-detail ms-5">
                <p className="delivery-header fs-1">Delivery Details</p>
                <p className="delivery-latitude fs-4">
                  Latitude Deliver: {product.DeliverLocation.latitudeDeliver}
                </p>
                <p className="delivery-longitude fs-4">
                  Longitude Deliver: {product.DeliverLocation.longitudeDeliver}
                </p>
                <button
                  type="button"
                  className="btn btn-lg btn-outline-dark mb-3"
                  onClick={() => {
                    handleCustomerLocation(
                      product.DeliverLocation.latitudeDeliver,
                      product.DeliverLocation.longitudeDeliver
                    );
                  }}
                >
                  Open customer Location
                </button>
              </div>
              {product.items.map((item, index) => {
                return (
                  <div className="row g-0" key={index}>
                    <div className="col-md-4 d-flex justify-content-center">
                      <img
                        src={item.image}
                        className="img-fluid rounded-start"
                        alt="..."
                        style={{ maxHeight: "140px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body d-flex flex-column align-items-center">
                        <p className="card-title fs-1">{item.name}</p>
                        <p className="card-quantity fs-4">
                          <span>Quantity:</span> {item.quantity} kg
                        </p>
                        <p className="card-amount fs-4">
                          <span>Amount:</span> Rs {item.ProductAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <p className="order-amount fs-2 mx-auto">
                Order Amount: {product.OrderAmount}
              </p>
              <div className="remove-product col-md-1 d-flex justify-content-center align-items-center mx-auto">
                <button
                  type="button"
                  className="btn btn-outline-success fs-4"
                  onClick={() => handleCompleted(product._id)}
                >
                  Completed
                </button>
              </div>
            </div>
          );
        })}
      <button
        className="btn btn-outline-dark btn-lg m-5"
        onClick={() => {
          setSettingVisible((prev) => (prev ? false : true));
        }}
      >
        Show Admin Setting
      </button>
      {settingVisible && (
        <form action="" onSubmit={handleAdminChanges}>
          <div className="changeThings d-flex flex-column gap-5 justify-content-center align-items-center border border-dark p-3">
            <p className="fs-2">Change Admin things</p>
            <div className="changeNotice fs-3">
              <span>Update Notice:</span>
              <textarea
                rows="5"
                cols="40"
                defaultValue={adminDetail.notice}
                name="notice"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="minOrderamt fs-3">
              <span>Min Order Amt for free delivery:</span>
              <input
                type="number"
                name="minOrder"
                defaultValue={adminDetail.minOrder}
                onChange={handleInputChange}
              />
            </div>

            <div className="changeContact fs-3">
              <span>Change Contact:</span>
              <input
                type="text"
                name="contact"
                defaultValue={adminDetail.contact}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-dark btn-lg mb-5">
              Save Changes
            </button>
          </div>
        </form>
      )}
      <button
        className="btn btn-outline-dark btn-lg m-5"
        onClick={() => {
          setAdminVisible((prev) => (prev ? false : true));
        }}
      >
        Show Admin Account
      </button>
      {adminVisible && (
        <form action="" onSubmit={handleAdminChanges}>
          <div className="changeAdminUsernamePassword d-flex flex-column gap-5 justify-content-center align-items-center border border-dark  p-3">
            <p className="fs-2">Change admin Username and Password</p>
            <div className="adminUsernamePassword fs-3">
              <span>Change Username:</span>
              <input
                type="username"
                name="username"
                defaultValue={adminDetail.admin.username}
                onChange={handleInputChange}
              />
              <br />
              <div className="mt-3" />
              <span>Change Password:</span>
              <input
                type="password"
                name="password"
                defaultValue={adminDetail.admin.password}
                onChange={handleInputChange}
                id="adminPassword"
              />
              <br />
              <input
                type="checkbox"
                className="ms-5"
                onClick={() => {
                  const x = document.getElementById("adminPassword");
                  if (x.type === "password") {
                    x.type = "text";
                  } else {
                    x.type = "password";
                  }
                }}
              />
              Show Password
            </div>
            <button type="submit" className="btn btn-outline-dark btn-lg mb-5">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
