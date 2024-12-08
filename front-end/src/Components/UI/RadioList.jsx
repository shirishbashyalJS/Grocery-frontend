import { useEffect, useState } from "react";

export const RadioList = ({ sendDataToParent, keys }) => {
  const [selectedItem, setSelectedItem] = useState("ALL");

  const handleSelect = (type) => {
    setSelectedItem(type);

    // Call the sendDataToParent function when a selection is made
    sendDataToParent(type);
  };

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      {keys.map((type, index) => {
        const id = index; // Ensure unique ID for each button

        return (
          <div key={index} className="radio-input">
            <input
              type="radio"
              className="btn-check"
              id={id}
              autoComplete="off"
              name="btnradio"
              value={type} // Set value to the type's name
              onChange={() => handleSelect(type)} // Call the handleSelect function
              checked={selectedItem === type} // Check if this is the selected item
            />
            <label className="btn btn-outline-dark label-btn" htmlFor={id}>
              {type}
            </label>
          </div>
        );
      })}
    </div>
  );
};
