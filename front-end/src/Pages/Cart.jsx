import { NavLink } from "react-router-dom";
import { useAdmin, useCart } from "../Components/Layout/Layout";
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

      {admin
        ? adminDetail && (
            <AdminCart
              adminDetail={adminDetail}
              adminUrl={adminUrl}
              GeneralUrl={GeneralUrl}
            />
          )
        : adminDetail && (
            <UserCart minOrder={adminDetail.minOrder} GeneralUrl={GeneralUrl} />
          )}
    </section>
  );
};
