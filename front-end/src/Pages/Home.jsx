import { Items } from "../Components/Layout/Items";
import { Carousel } from "../Components/UI/Carousel";
import { useOutletContext } from "react-router-dom";
import { Notice } from "../Components/UI/Notice";
import { Loading } from "../Components/UI/Loading";

export const Home = ({ itemLists, adminDetail, productsUrl }) => {
  const { searchValue } = useOutletContext();

  return (
    <section className="home">
      <hr />

      {adminDetail ? <Notice adminDetail={adminDetail} /> : <Loading />}
      <Carousel />
      {itemLists ? (
        <Items
          itemLists={itemLists}
          searchValue={searchValue}
          productsUrl={productsUrl}
        />
      ) : (
        <Loading />
      )}
    </section>
  );
};
