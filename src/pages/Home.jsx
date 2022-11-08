import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { IoMdAddCircleOutline } from "react-icons/io";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const {
    data,
    filterData,
    setSearchTerm,
    searchTerm,
    fav,
    setFav,
    isClickedFav,
    setIsClickedFav,
    setAlert,
    alert,
    setPriceLevel,
    priceLevel,
  } = useContext(Context);

  // HandleClick Section
  const handleClick = (item) => {
    const newFav = {
      identifier: item.identifier,
      lastPrice: item.lastPrice,
      dayHigh: item.dayHigh,
      dayLow: item.dayLow,
      pChange: item.pChange,
      lastUpdateTime: item.lastUpdateTime.slice(11),
    };
    setFav([...fav, newFav]);
    toast.success(`${item.identifier} successfully added`);
  };

  const handleAddAlertClick = (item) => {
    const newAlert = {
      identifier: item.identifier,
      lastPrice: item.lastPrice,
      alertPrice: priceLevel ? priceLevel : 150,
    };
    setAlert([...alert, newAlert]);
    toast.success(`${newAlert.alertPrice} price alerts added successfully`);
  };

  // UseEffect Section

  useEffect(() => {
    if (filterData !== "") {
      setSearchTerm([...searchTerm, filterData]);
    }
  }, [filterData]);

  useEffect(() => {
    alert.forEach((item) => {
      if (item.alertPrice >= item.lastPrice) {
        toast("Price range has reached the level you set", {
          icon: "⚠️",
        });
      }
    });
  }, [alert, filterData]);

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="bg-slate-200 lg:max-w-screen-lg lg:mx-auto mx-4 mt-10 p-5 rounded-lg">
        <div
          className={`bg-white p-3 w-full justify-between ${
            searchTerm.length === 0 ? "hidden" : "flex"
          }`}
        >
          <p className="capitalize">recent searches : </p>
          <div className="flex space-x-3">
            {searchTerm.map((item, idx) => (
              <p className="hover:underline cursor-pointer" key={idx}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center my-3">
          <p className="text-sm text-gray-500 mt-5">
            Last updated{" "}
            <span className="text-gray-800 font-semibold">Now</span>
          </p>
          <button
            className={`bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-300 duration-300 ${
              fav.length === 0 && "cursor-not-allowed bg-blue-300"
            }`}
            onClick={() => setIsClickedFav(!isClickedFav)}
            disabled={fav.length === 0 ? true : false}
          >
            {isClickedFav ? "Close Favorites" : "Show Favorites"}
          </button>
        </div>
        {isClickedFav ? (
          <div className="overflow-auto rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <p>Set the price you want to receive alerts for :</p>
              <input
                placeholder="default value 150"
                className="px-5 py-2 outline-none focus:bg-slate-100 rounded-lg"
                onChange={(e) => setPriceLevel(e.target.value)}
              />
            </div>
            <table className="mt-3 w-full">
              <thead>
                <tr>
                  {[
                    "Index",
                    "Last",
                    "High",
                    "Low",
                    "Chg",
                    "Time",
                    "Add Alert",
                  ].map((item, idx) => (
                    <th
                      className={`${
                        idx === 0 ? "w-auto" : "w-[10rem]"
                      } p-3 text-sm font-semibold  text-left`}
                      key={idx}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fav.map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-white hover:bg-gray-500 hover:text-white duration-100"
                  >
                    <td className="p-2">{item.identifier}</td>
                    <td>{item.lastPrice}</td>
                    <td>{item.dayHigh}</td>
                    <td>{item.dayLow}</td>
                    <td
                      className={`${
                        item.pChange >= 0 ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {item.pChange}%
                    </td>
                    <td>{item.lastUpdateTime}</td>
                    <td>
                      <IoMdAddCircleOutline
                        className="text-2xl cursor-pointer"
                        onClick={() => handleAddAlertClick(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-auto rounded-lg">
            <table className="mt-3 w-full">
              <thead>
                <tr>
                  {["Index", "Last", "High", "Low", "Chg", "Time", "Fav"].map(
                    (item, idx) => (
                      <th
                        className={`${
                          idx === 6 ? "w-auto" : "w-[10rem]"
                        } p-3 text-sm font-semibold  text-left`}
                        key={idx}
                      >
                        {item}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data
                  ?.filter((val) => {
                    if (filterData === "") {
                      return val;
                    } else if (
                      val.symbol
                        .toLowerCase()
                        .includes(filterData.toLowerCase()) ||
                      val.identifier
                        .toLowerCase()
                        .includes(filterData.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((item, idx) => (
                    <tr
                      key={idx}
                      className="bg-white hover:bg-gray-500 hover:text-white duration-100"
                    >
                      <td className="p-2">{item.identifier}</td>
                      <td>{item.lastPrice}</td>
                      <td>{item.dayHigh}</td>
                      <td>{item.dayLow}</td>
                      <td
                        className={`${
                          item.pChange >= 0 ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {item.pChange}%
                      </td>
                      <td>{item.lastUpdateTime.slice(11)}</td>
                      <td className="text-left">
                        <IoMdAddCircleOutline
                          className="text-2xl cursor-pointer"
                          onClick={() => handleClick(item)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
export default Home;
