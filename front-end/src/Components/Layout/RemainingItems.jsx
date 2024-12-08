import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAdmin } from "./Layout";
import { MdDelete } from "react-icons/md";

export const RemainingItems = ({
  itemLists,
  selectedItemList,
  searchValue,
}) => {
  const [remainingItems, setRemainingItems] = useState([]);
  const scrollIntoViewRef = useRef(null); // Use a ref for scrolling
  const { admin, setAdmin } = useAdmin();
  const [addItems, setAddItems] = useState(false);
  const [newProduct, setNewProduct] = useState({
    available: true,
    bestItem: false,
  });

  const handleNewProductDetails = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleNewProductSubmit = (e) => {
    e.preventDefault();
    setAddItems(false);
    console.log(newProduct, selectedItemList);
  };
  const handleDeleteItem = (item) => {
    const confirm = prompt("Enter product name to delete product");
    // console.log(confirm);

    if (confirm.toLowerCase() == item.name.toLowerCase()) console.log(item);
  };
  useEffect(() => {
    const All = itemLists;

    const displayItems = () => {
      let itemsToDisplay =
        selectedItemList == "ALL"
          ? All
          : itemLists.filter((item) => {
              return item.type == selectedItemList;
            }) || [];
      // Filter items based on searchValue

      if (searchValue) {
        itemsToDisplay = itemsToDisplay.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }

      setRemainingItems(itemsToDisplay);
    };

    displayItems();
    if (searchValue) scrollIntoViewRef.current.scrollIntoView();
  }, [selectedItemList, itemLists, searchValue]);

  return (
    <>
      {selectedItemList != "ALL" && admin && (
        <div className="add-item-btn d-flex justify-content-center my-5">
          <button
            type="button"
            className="btn btn-lg ms-5 btn-outline-dark"
            onClick={() => setAddItems((prev) => (prev ? false : true))}
          >
            Add Items
          </button>
        </div>
      )}
      {selectedItemList != "ALL" && addItems && (
        <div className="add-items d-flex justify-content-center">
          <form action="" className="d-flex flex-column fs-4 ">
            <input
              type="url"
              name="url"
              placeholder="Item Picture URL"
              className="mb-3 p-2"
              onChange={handleNewProductDetails}
            />
            <input
              name="name"
              type="text"
              placeholder="Item Name"
              className="mb-3 p-2"
              onChange={handleNewProductDetails}
            />
            <input
              name="rate"
              type="number"
              placeholder="Item Rate"
              className="mb-3 p-2"
              onChange={handleNewProductDetails}
            />
            <input
              name="unit"
              type="text"
              placeholder="Item Unit"
              className="mb-3 p-2"
              onChange={handleNewProductDetails}
            />

            <button
              type="submit"
              className="mb-3 p-2 btn btn-lg  btn-outline-dark"
              onClick={handleNewProductSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <div
        className="card-container"
        id="remainingItemsContainer"
        ref={scrollIntoViewRef}
      >
        {remainingItems.length > 0 ? (
          remainingItems.map((item, index) => (
            <div className="card" key={index}>
              {selectedItemList == "ALL" && admin && (
                <button className="btn btn-outline-dark w-25 ms-auto">
                  <MdDelete
                    className="fs-2 text-danger"
                    onClick={() => {
                      handleDeleteItem(item);
                    }}
                  />
                </button>
              )}
              <div className="card-image">
                <img src={item.image} alt="Image" />
              </div>
              <h3 className="card-name">{item.name}</h3>
              <div className="card-rate mb-3">
                <span>Rate: </span>
                <span className="stars">Rs {item.rate}</span>
              </div>

              <NavLink to={`/product/${item._id}`} className="NavLink">
                <button className="explore-button">View</button>
              </NavLink>
            </div>
          ))
        ) : (
          <p>No items found matching your search.</p>
        )}
      </div>
    </>
  );
};
