import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAdmin, useCart, useLogin } from "../Layout/Layout";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

export const Product = ({ itemLists }) => {
  const { admin, setAdmin } = useAdmin();
  const { login, setLogin } = useLogin();
  const All = Object.values(itemLists).flat();
  const params = useParams();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useCart([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [editMode, setEditMode] = useState(false);
  const storedLogin = localStorage.getItem("login");
  const [newRate, setNewRate] = useState();

  const handleProductEdit = () => {
    setEditMode(true);
  };

  const handleRateChange = (e) => {
    setNewRate(e.target.value);
  };
  const handleSaveRate = () => {
    setSelectedProduct(
      (prevProduct) => prevProduct,
      (selectedProduct.rate = newRate)
    );
    // console.log(selectedProduct);
  };

  useEffect(() => {
    const foundProduct = All.find((product) => product.name === params.id);
    if (foundProduct) {
      setSelectedProduct(foundProduct);
    }
    if (storedLogin === "true") {
      setLogin(true);
    }
    if (storedLogin === "false") {
      setLogin(false);
    }
  }, [All, params.id, storedLogin]);

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
      setCart((prevCart) => [...prevCart, newObj]);
    }

    // Open modal by setting showModal to true
    setShowModal(true);
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
            <div className="edit-product fs-2 d-flex justify-content-around">
              <FaSave onClick={handleSaveRate} />
              <FaEdit onClick={handleProductEdit} />
              <MdDelete />
            </div>
          )}

          <div className="card-name-container">
            <h3 className="card-name fs-2">{selectedProduct.name}</h3>
          </div>
          <div className="card-rate fs-3">
            <span>Rate: </span>
            <span className="stars">{selectedProduct.rate}</span>
          </div>
          {editMode && (
            <div className="card-rate fs-3">
              <span>Update Rate To: </span>
              <input type="number" onChange={handleRateChange} />
            </div>
          )}
          {/* <div className="card-rating fs-3">
            <span>Rating: </span>
            <span className="stars">{selectedProduct.rating}</span>
          </div> */}

          {!admin && (
            <>
              <div className="add-manually-div fs-3">
                <span className="me-2">
                  Quantity in {selectedProduct.unit}:
                </span>
                <input
                  type="number"
                  style={{ width: "80px" }}
                  defaultValue={1}
                  min="1"
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="total-price-container fs-3">
                <p className="total-price">
                  Total Amount: {Math.round(selectedProduct.rate * quantity)}
                </p>
              </div>
              <button
                className="explore-button fs-4"
                onClick={() => {
                  handleAddToCart(
                    selectedProduct,
                    Math.round(selectedProduct.rate * quantity),
                    quantity
                  );
                }}
              >
                Add To Cart
              </button>
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
