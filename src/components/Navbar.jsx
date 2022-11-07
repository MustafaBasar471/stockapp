import React from "react";

const Navbar = () => {
  return (
    <div className="bg-slate-500 w-full">
      <div className="max-w-screen-lg mx-auto h-full flex items-center justify-between py-3">
        <p className="text-2xl text-white">Stock Market App</p>

        <input
          placeholder="Enter Something"
          className="w-[20rem] px-5 py-2 rounded focus:outline-none focus:bg-slate-100 focus:shadow-lg"
        />
      </div>
    </div>
  );
};

export default Navbar;
