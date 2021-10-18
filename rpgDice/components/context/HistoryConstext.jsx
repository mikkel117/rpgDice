import React, { createContext, useState } from "react";

export const HistoryContext = createContext();

const HistoryContextProvider = (props) => {
  const [history, setHistory] = useState([]);
  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;
