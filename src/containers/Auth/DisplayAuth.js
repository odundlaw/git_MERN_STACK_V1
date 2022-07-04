import React from "react";
import { useSelector } from "react-redux";

const DisplayAuth = (props) => {
  const user = useSelector((state) => state.users);
  return (
    <div className="mb-6 flex flex-col sm:flex sm:flex-row sticky top-[50px] space-y-3 sm:space-y-0 w-full justify-between bg-slate-100 opacity-90 z-30 p-3 rounded-lg items-center">
      <div className="flex space-x-4">
        <img
          src={user?.imageUrl}
          alt={user?.fullName}
          className="rounded-full h-12 w-12"
        />
        <div className="flex flex-col space-y-0">
          <span className="capitalize text-lg text-black">
            {user?.fullName.toLowerCase()}
          </span>
          <span className="text-[12px] sm:text-sm text-gray-500">
            {user?.email}
          </span>
        </div>
      </div>
      <section>
        <button
          className="sm:px-5 sm:py-2 text-sm sm:text-md px-2 py-2 bg-purple-400 text-white shadow-md hover:bg-purple-800 hover:transition-all rounded-full"
          onClick={props.signOut}
        >
          Logout/Sign Out
        </button>
      </section>
    </div>
  );
};

export default DisplayAuth;
