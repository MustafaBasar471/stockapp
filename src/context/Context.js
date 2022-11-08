import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState("");
  const [searchTerm, setSearchTerm] = useState([]);
  const [fav, setFav] = useState([]);
  const [isClickedFav, setIsClickedFav] = useState(false);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
