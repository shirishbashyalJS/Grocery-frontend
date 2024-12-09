import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAdmin, useCart, useLogin } from "../Layout/Layout";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import axios from "axios";

export const Product = ({ itemLists, productsUrl }) => {
  const { admin, setAdmin } = useAdmin();
  const { login, setLogin } = useLogin();
  const All = Object.values(itemLists).flat();
  const params = useParams();
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const foundProduct = All.find((product) => product._id == params.id);
    if (foundProduct) {
      return foundProduct;
    } else return {};
  });
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useCart([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [editMode, setEditMode] = useState(false);
  const storedLogin = localStorage.getItem("login");

  const [updateProduct, setUpdateProduct] = useState();

  const handleProductEdit = () => {
    setUpdateProduct(selectedProduct);
    setEditMode(true);
  };
  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateProduct((prevUpdate) => ({
      ...prevUpdate,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangesSave = () => {
    const demo = prompt("Enter 'ok' to make the changes");
    if (updateProduct && demo == "ok") {
      axios
        .put(productsUrl + "/" + selectedProduct._id, updateProduct)
        .then((res) => {
          alert("Successful");
        })
        .catch((err) => {
          alert("Failed");
        });
    } else {
      alert("Please make some changes to update data");
    }
  };

  useEffect(() => {
    if (storedLogin === "true") {
      setLogin(true);
    }
    if (storedLogin === "false") {
      setLogin(false);
    }
  }, [storedLogin, selectedProduct]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = (product, productAmt, quantity) => {
    if (login) {
      const newObj = {
        ...product,
        ProductAmount: productAmt,
        quantity: quantity,
      };
      if (productAmt > 0) {
        setCart((prevCart) => [...prevCart, newObj]);
        setShowModal(true);
      } else {
        alert(
          "You have to enter product quantity which must be greater than 0"
        );
      }
    }

    // Open modal by setting showModal to true
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when clicking close
  };

  return (
    <div className="product-container container">
      <NavLink to="/">
        <button type="button" className="btn btn-outline-dark">
          Go Back
        </button>
      </NavLink>
      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal text-body-emphasis">Pricing</h1>
        <p className="fs-5 text-body-secondary">
          In our grocery shop, we strive to offer competitive pricing to make
          quality food accessible for everyone. Fresh produce is priced per
          kilogram, ensuring you pay only for what you need.
        </p>
      </div>
      <div className="card-container w-100 d-flex justify-content-between">
        <div className="card-image">
          <img
            src={selectedProduct.image}
            className="product-image card w-100"
            alt="Image"
          />
        </div>
        <div className="card">
          {admin && (
            <div className="edit-product fs-2 d-flex justify-content-around ">
              <button
                className="btn btn-outline-dark ms-5"
                onClick={handleChangesSave}
              >
                <FaSave />
              </button>
              <button
                className="btn btn-outline-dark ms-5"
                onClick={handleProductEdit}
              >
                <FaEdit />
              </button>
            </div>
          )}

          <div className="card-name-container">
            <h3 className="card-name fs-2">{selectedProduct.name}</h3>
          </div>
          <div className="card-rate fs-3">
            <span>Rate: </span>
            <span className="stars">Rs {selectedProduct.rate}</span>
          </div>
          {editMode && (
            <div>
              <form action="">
                <div className="card-rate fs-3">
                  <span>Update Name To: </span>
                  <input
                    type="text"
                    name="name"
                    value={updateProduct.name}
                    onChange={handleProductChange}
                  />
                </div>
                <div className="card-rate fs-3">
                  <span>Update Rate To: </span>
                  <input
                    value={updateProduct.rate}
                    type="number"
                    name="rate"
                    onChange={handleProductChange}
                  />
                </div>
                <div className="card-rate fs-3">
                  <span>Available: </span>
                  <input
                    type="checkbox"
                    name="available"
                    checked={updateProduct.available}
                    onChange={handleProductChange}
                  />
                </div>
                <div className="card-rate fs-3">
                  <span>Best Item: </span>
                  <input
                    type="checkbox"
                    name="bestItem"
                    checked={updateProduct.bestItem}
                    onChange={handleProductChange}
                  />
                </div>
              </form>
            </div>
          )}
          {/* <div className="card-rating fs-3">
            <span>Rating: </span>
            <span className="stars">{selectedProduct.rating}</span>
          </div> */}

          {!admin && (
            <>
              {selectedProduct.unit.toLowerCase() === "kg" ? (
                <div className="add-manually-div fs-3">
                  <span className="me-2">
                    Quantity in {selectedProduct.unit}:
                  </span>
                  <input
                    min={1}
                    type="number"
                    style={{ width: "80px" }}
                    defaultValue={1}
                    onChange={handleQuantityChange}
                  />
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
                    }}
                    className="fs-2"
                    style={{
                      fontWeight: 500,
                      border: "none",
                      backgroundColor: "#D3D3D3",
                      borderRadius: "5px",
                    }}
                  >
                    –
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={quantity}
                    className="fs-3"
                    style={{
                      border: "none",
                      maxWidth: "30px",
                      textAlign: "center",
                    }}
                  />
                  <button
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                    className="fs-2"
                    style={{
                      fontWeight: 500,
                      border: "none",
                      backgroundColor: "#D3D3D3",
                      borderRadius: "5px",
                    }}
                  >
                    +
                  </button>
                </div>
              )}
              <div className="total-price-container fs-3">
                <p className="total-price">
                  Total Amount: Rs {selectedProduct.rate * quantity}
                </p>
              </div>
              {selectedProduct.available ? (
                <button
                  className="explore-button fs-4"
                  onClick={() => {
                    handleAddToCart(
                      selectedProduct,
                      selectedProduct.rate * quantity,
                      quantity
                    );
                  }}
                >
                  Add To Cart
                </button>
              ) : (
                <p className="fs-3">Sorry! Item is not available</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for Add to Cart Confirmation */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Add to Cart</h3>
            <p className="fs-3">
              {login
                ? "Your item is added successfully"
                : "You have to Login first."}
            </p>
            <button className="btn btn-primary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>{`

      `}</style>
    </div>
  );
};
