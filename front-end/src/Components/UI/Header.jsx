// import { useState, useRef } from "react";
// import { FaCartPlus } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// export const Header = ({ setSearchValue }) => {
//   const remainingItemsContainerRef = useRef(null); // Create a ref for the remaining items container

//   const handleHeaderSearch = (e) => {
//     setSearchValue(e.target.value);
//   };

//   const handleSearchClick = () => {
//     if (remainingItemsContainerRef.current) {
//       console.log(remainingItemsContainerRef);

//       remainingItemsContainerRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//       });
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-warning bg-warning pt-4 pb-4">
//       <div className="container-fluid container">
//         <a className="navbar-brand navbar-brand-section" href="/">
//           <img src="../../../images/ganesh.png" style={{ height: 35 }} alt="" />
//           <span className="header-title">Bashyal</span>
//         </a>
//         <form className="d-flex search-form">
//           <input
//             className="form-control me-2 input-search"
//             type="search"
//             placeholder="Search"
//             aria-label="Search"
//             onChange={handleHeaderSearch}
//             onClick={handleSearchClick} // Call the scroll function here
//           />
//         </form>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <NavLink
//                 to="/contact"
//                 className="nav-link active"
//                 aria-current="page"
//               >
//                 Contact
//               </NavLink>
//             </li>
//           </ul>
//           <ul className="navbar-nav ms-auto ms-lg-5 mb-2 mb-lg-0">
//             <li className="nav-item">
//               <NavLink
//                 to="/login"
//                 className="nav-link active"
//                 aria-current="page"
//               >
//                 Login
//               </NavLink>
//             </li>
//           </ul>
//           <ul className="navbar-nav ms-auto ms-lg-5 mb-2 mb-lg-0">
//             <li className="nav-item">
//               <NavLink
//                 to="/cart"
//                 className="nav-link active"
//                 aria-current="page"
//               >
//                 <FaCartPlus className="cart-logo" />
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

import { useState, useRef } from "react";
import { FaCartPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAdmin, useCart, useLogin } from "../Layout/Layout"; // Import useLogin to access login state

export const Header = ({ setSearchValue }) => {
  const { login } = useLogin(); // Access login state
  const remainingItemsContainerRef = useRef(null);
  const { cart, setCart } = useCart();
  const { admin, setAdmin } = useAdmin();

  const handleHeaderSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchClick = () => {
    if (remainingItemsContainerRef.current) {
      remainingItemsContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  // Function to handle menu item click
  const handleNavLinkClick = () => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    if (navbarCollapse) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide(); // Close the menu
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-warning bg-warning pt-4 pb-4">
      <div className="container-fluid container">
        <a className="navbar-brand navbar-brand-section" href="/">
          <img src="../../../images/ganesh.png" style={{ height: 35 }} alt="" />
          <span className="header-title">Bashyal</span>
        </a>
        <form className="d-flex search-form">
          <input
            className="form-control me-2 input-search"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleHeaderSearch}
            onClick={handleSearchClick}
          />
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-link active"
                onClick={handleNavLinkClick}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto ms-lg-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/login"
                className="nav-link active"
                onClick={handleNavLinkClick}
              >
                {login ? "Logout" : "Login"}
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto ms-lg-5 mb-2 mb-lg-0">
            <li className="nav-item cart-logo-nav">
              <NavLink
                to="/cart"
                className="nav-link active"
                onClick={handleNavLinkClick}
              >
                <div className="card-length-div">
                  <div className="card-temp-div">
                    {!admin && <p className="cart-length">{cart.length}</p>}
                  </div>
                </div>
                <FaCartPlus className="cart-logo" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
