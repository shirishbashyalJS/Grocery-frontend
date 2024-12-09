import { NavLink } from "react-router-dom";
import { useAdmin, useCart } from "../Components/Layout/Layout";
import { useEffect, useState } from "react";
import { BuyProduct } from "../Components/UI/BuyProduct";
import { UserCart } from "../Components/UI/UserCart";
import { AdminCart } from "../Components/UI/AdminCart";
export const Cart = ({ adminDetail, adminUrl, GeneralUrl }) => {
  const { admin, setAdmin } = useAdmin();
  return (
    <section className="cartPage">
      <NavLink to="/">
        <button type="button" className="btn btn-outline-dark ms-5">
          Go Back
        </button>
      </NavLink>
      {/* cart Items */}

      {admin ? (
        <AdminCart
          adminDetail={adminDetail}
          adminUrl={adminUrl}
          GeneralUrl={GeneralUrl}
        />
      ) : (
        <UserCart minOrder={adminDetail.minOrder} GeneralUrl={GeneralUrl} />
      )}
    </section>
  );
};
