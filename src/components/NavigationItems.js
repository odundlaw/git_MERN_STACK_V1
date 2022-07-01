import React from "react";
import { NavLink } from "react-router-dom";
import listStyle from "../constants/listStyle";

const NavigationItems = () => {
  return (
    <>
      <NavLink to="/" className={({ isActive }) => listStyle(isActive)}>
        Posts
      </NavLink>
      <NavLink to="addPost" className={({ isActive }) => listStyle(isActive)}>
        Add Post
      </NavLink>
      <NavLink
        to="auth/login"
        className={({ isActive }) => listStyle(isActive)}
      >
        Authentication
      </NavLink>
    </>
  );
};

export default NavigationItems;
