import React, { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { IoMdAddCircleOutline } from "react-icons/io";
import Navbar from "../components/Navbar";

const Home = () => {
  const { data, filterData, setSearchTerm, searchTerm } = useContext(Context);

  useEffect(() => {
    if (filterData !== "") {
      setSearchTerm([...searchTerm, filterData]);
    }
  }, [filterData]);

  const handleClick = (item) => {};
  return (
    <>
      <Navbar />
      <div className="bg-slate-200 lg:max-w-screen-lg lg:mx-auto mx-4 mt-10 p-5 rounded-lg">
        <div className="bg-white p-3 flex w-full justify-between">
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
          <button className={`bg-blue-500 px-5 py-2`}>Show Favorites</button>
        </div>
        <div className="overflow-auto rounded-lg">
          <table className="mt-3 w-full">
            <thead>
              <tr>
                {["Index", "Last", "High", "Low", "Chg", "Time", "Fav"].map(
                  (item, idx) => (
                    <th
                      className={`${
                        idx === 0 ? "w-auto" : "w-[10rem]"
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
                    console.log(val);
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
      </div>
    </>
  );
};
export default Home;
