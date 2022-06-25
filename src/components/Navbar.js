import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="relative flex justify-around w-[30%] items-baseline">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? " bg-purple-300 h-full p-2" : "hover:bg-purple-300 p-2"
        }
      >
        Posts
      </NavLink>
      <NavLink
        to="addPost"
        className={({ isActive }) =>
          isActive ? " bg-purple-300 h-full p-2" : "hover:bg-purple-300 p-2"
        }
      >
        Add Post
      </NavLink>
    </nav>
  );
}

export default Navbar;
