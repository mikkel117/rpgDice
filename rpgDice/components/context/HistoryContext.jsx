import React, { createContext, useState } from "react";

export const HistoryContext = createContext();

const HistoryContextProvider = (props) => {
  const [history, setHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [foldersModal, setFoldersModal] = useState(false);
  return (
    <HistoryContext.Provider
      value={{
        history,
        setHistory,
        modalOpen,
        setModalOpen,
        foldersModal,
        setFoldersModal,
      }}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;
