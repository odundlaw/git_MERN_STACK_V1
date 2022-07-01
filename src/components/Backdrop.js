import React from "react";

const Backdrop = ({ click, showBackdrop }) => {
  return (
    <div
      className={`sm:hidden h-[100vh] w-[100%] bg-slate-700 bg-opacity-10 z-40 top-10 cursor-pointer ${
        showBackdrop ? "fixed" : "hidden"
      }`}
      onClick={click}
    ></div>
  );
};

export default Backdrop;
