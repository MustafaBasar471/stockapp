import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState("");
  const [searchTerm, setSearchTerm] = useState([]);
  const [fav, setFav] = useState([]);
  const [isClickedFav, setIsClickedFav] = useState(false);
  const [alert, setAlert] = useState([]);
  const [priceLevel, setPriceLevel] = useState();

  return (
    <Context.Provider
      value={{
        data,
        setData,
        filterData,
        setFilterData,
        setSearchTerm,
        searchTerm,
        setFav,
        fav,
        setIsClickedFav,
        isClickedFav,
        setAlert,
        alert,
        setPriceLevel,
        priceLevel,
      }}
    >
      {children}
    </Context.Provider>
  );
};
