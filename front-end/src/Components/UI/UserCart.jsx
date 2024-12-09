import { useCart } from "../Layout/Layout";
import { BuyProduct } from "./BuyProduct";

export const UserCart = ({ minOrder, GeneralUrl }) => {
  const { cart, setCart } = useCart();

  const handleRemove = (index) => {
    const tempCart = [...cart];
    tempCart.splice(index, 1);

    setCart(tempCart);
  };
  return (
    <div className="added-cart-items container pb-5 pt-5 ">
      <p className="items-title">Cart Items</p>

      {cart.map((product, index) => {
        return (
          <div
            className="card mb-3 p-3 mx-auto "
            style={{ maxWidth: "540px" }}
            key={index}
          >
            <div className="row g-0">
              <div className="col-md-4 d-flex justify-content-center">
                <img
                  src={product.image}
                  className="img-fluid rounded-start"
                  alt="..."
                  style={{ maxHeight: "140px" }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body d-flex flex-column align-items-center">
                  <p className="card-title fs-1">{product.name}</p>
                  <p className="card-quantity fs-4">
                    <span>Quantity:</span> {product.quantity} kg
                  </p>
                  <p className="card-amount fs-4">
                    <span>Amount:</span> Rs {product.ProductAmount}
                  </p>
                </div>
              </div>
              <div className="remove-product col-md-1 d-flex justify-content-center align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {/* cart-items-close */}
      <div className="mb-3 p-3">
        <BuyProduct
          cart={cart}
          setCart={setCart}
          minOrder={minOrder}
          GeneralUrl={GeneralUrl}
        />
      </div>
    </div>
  );
};
