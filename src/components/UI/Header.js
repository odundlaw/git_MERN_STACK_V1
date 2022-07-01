import React, { useState } from "react";
import Navbar from "../Navbar";
import SideBar from "../SideBar";

const Header = () => {
  const [showSideBar, setShowNavBar] = useState(false);

  const toggleNavBarHandler = () => {
    setShowNavBar((preValue) => !preValue);
  };
  return (
    <>
      <SideBar showSideBar={showSideBar} click={toggleNavBarHandler} />
      <header className="h-10 bg-purple-600 text-white p-2 px-6 flex items-center justify-between sticky top-0 shadow-md space-x-10 w-[100%]">
        <h3 className="py-2 text-md sm:text-lg cursor-pointer font-semibold bg-purple-500 px-1.5 shadow-sm">
          Blog Post
        </h3>
        <Navbar click={toggleNavBarHandler} />
      </header>
    </>
  );
};

export default Header;
