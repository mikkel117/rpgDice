import React, { createContext, useState } from "react";

export const HistoryContext = createContext();

const HistoryContextProvider = (props) => {
  const [history, setHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <HistoryContext.Provider
      value={{ history, setHistory, modalOpen, setModalOpen }}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;
