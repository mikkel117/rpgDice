import React, { createContext, useState } from "react";

export const FolderContext = createContext();

const FolderContextProvider = (props) => {
  const [folder, setFolder] = useState([
    {
      id: 1,
      name: "Bob the wizard",
      items: [
        { id: 1, name: "Staff attack", numberOfDice: 1, dice: 20, buff: 3 },
      ],
    },
    {
      id: 2,
      name: "Alex the Rogue",
      items: [
        { id: 1, name: "Dagger attack", numberOfDice: 1, dice: 20, buff: 7 },
      ],
    },
    {
      id: 3,
      name: "Peter the knight",
      items: [
        { id: 1, name: "Sword attack", numberOfDice: 1, dice: 20, buff: 10 },
      ],
    },
  ]);
  return (
    <FolderContext.Provider value={{ folder, setFolder }}>
      {props.children}
    </FolderContext.Provider>
  );
};

export default FolderContextProvider;
