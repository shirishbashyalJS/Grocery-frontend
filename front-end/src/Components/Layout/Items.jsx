import { BestItems } from "../UI/BestItems";
// import itemLists from "../../API/Items.json";

import { useEffect, useRef, useState } from "react";
import { RadioList } from "../UI/RadioList";
import { RemainingItems } from "./RemainingItems";
import { useWindowScroll } from "@uidotdev/usehooks";
import { BiSolidArrowToTop } from "react-icons/bi";

export const Items = ({ itemLists, searchValue }) => {
  const [selectedItemList, setSelectedItemList] = useState("ALL");
  const keys = ["ALL", Object.keys(itemLists)].flat();
  const [bestItems, setBestItems] = useState();

  function handleDataFromChild(data) {
    setSelectedItemList(data);
  }
  useEffect(() => {
    setBestItems(
      Object.values(itemLists)
        .flat()
        .filter((item) => {
          return item.bestItem === true;
        })
    );
  }, []);

  const [{ x, y }, scrollTo] = useWindowScroll();
  return (
    <section className="items" id="items">
      <div id="bestitems"></div>
      {bestItems && <BestItems bestItems={bestItems} />}
      <div className="all-items container">
        <p className="items-title">Menu</p>
        <RadioList sendDataToParent={handleDataFromChild} keys={keys} />
      </div>
      <RemainingItems
        itemLists={itemLists}
        selectedItemList={selectedItemList}
        searchValue={searchValue}
      />
      <aside style={{ position: "fixed", bottom: 10, right: 10 }}>
        <button
          className="btn btn-outline-dark fs-3 rounded-circle"
          onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
          style={{ visibility: y > 1600 ? "visible" : "hidden" }}
        >
          <BiSolidArrowToTop />
        </button>
      </aside>
    </section>
  );
};
