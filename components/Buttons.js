import React from "react";
//import Data from "../api//Data";

const Buttons = ({ filterItem, setItem, menuItems, all_post }) => {
  console.log(menuItems);
  return (
    <>
      <div className="d-flex justify-content-center">
        <button
          className="btn-dark text-white p-1 px-3 mx-5 fw-bold btn"
          onClick={() => setItem(all_post)}
        >
          All
        </button>
        {menuItems.map((Val, id) => {
          return (
            <button
              className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold"
              onClick={() => filterItem(Val)}
              key={id}
            >
              {Val}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Buttons;