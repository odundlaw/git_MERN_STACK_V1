import React from "react";
import { NavLink } from "react-router-dom";
import listStyle from "../constants/listStyle";

const NavigationItems = () => {
  return (
    <>
      <NavLink
        data-mdb-ripple="true"
        data-mdb-ripple-color="dark"
        to="/"
        className={({ isActive }) => listStyle(isActive)}
      >
        Posts
      </NavLink>
      <NavLink
        data-mdb-ripple="true"
        data-mdb-ripple-color="dark"
        to="addPost"
        className={({ isActive }) => listStyle(isActive)}
      >
        Add Post
      </NavLink>
      <NavLink
        data-mdb-ripple="true"
        data-mdb-ripple-color="dark"
        to="auth/login"
        className={({ isActive }) => listStyle(isActive)}
      >
        Authentication
      </NavLink>
    </>
  );
};

export default NavigationItems;
