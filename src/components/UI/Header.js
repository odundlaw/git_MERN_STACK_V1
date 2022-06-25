import React from "react";

const Header = (props) => {
  return (
    <header className="h-10 bg-purple-600 text-white p-2 px-6 flex items-center justify-between sticky top-0 shadow-sm space-x-10 w-[100%]">
      <h3 className="text-lg font-semibold bg-purple-500 p-1.5 shadow-sm">Blog Post</h3>
      {props.children}
    </header>
  );
};


export default Header;