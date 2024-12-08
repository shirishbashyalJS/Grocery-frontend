import { useContext } from "react";
import { Items } from "../Components/Layout/Items";
import { Carousel } from "../Components/UI/Carousel";
import { useOutletContext } from "react-router-dom";
import { useLogin } from "../Components/Layout/Layout";
import { Notice } from "../Components/UI/Notice";

export const Home = ({ itemLists, adminDetail, productsUrl }) => {
  const { searchValue } = useOutletContext();

  return (
    <section className="home">
      <hr />

      <Notice adminDetail={adminDetail} />
      <Carousel />
      <Items
        itemLists={itemLists}
        searchValue={searchValue}
        productsUrl={productsUrl}
      />
    </section>
  );
};
