import { useContext } from "react";
import { Items } from "../Components/Layout/Items";
import { Carousel } from "../Components/UI/Carousel";
import { useOutletContext } from "react-router-dom";
import { useLogin } from "../Components/Layout/Layout";

export const Home = ({ itemLists }) => {
  const { searchValue } = useOutletContext();

  return (
    <section className="home">
      <hr />
      <marquee
        behavior="alternate"
        direction=""
        style={{
          backgroundColor: "rgb(255, 193, 7)",
          margin: 0,
          fontSize: "20px",
          boxShadow: "5px 5px 5px orange",
        }}
      >
        Notice!! We offer free delivery charge for order with amount more than
        Rs 500 upto 1km radius. Order interval will be from 7 AM to 5PM.
        Cancellation order feature is not available. Ordered Item will be
        available within 1 hr and 1km radius.
      </marquee>
      <Carousel />
      <Items itemLists={itemLists} searchValue={searchValue} />
    </section>
  );
};
