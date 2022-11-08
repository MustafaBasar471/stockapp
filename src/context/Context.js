import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState("");
  const [searchTerm, setSearchTerm] = useState([]);

  return (
    <Context.Provider
      value={{
        data,
        setData,
        filterData,
        setFilterData,
        setSearchTerm,
        searchTerm,
      }}
    >
      {children}
    </Context.Provider>
  );
};
