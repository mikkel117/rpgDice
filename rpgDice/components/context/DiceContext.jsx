import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DiceContext = createContext();

const DiceContextProvider = (props) => {
  const [dice, setDice] = useState([
    { id: 1, sides: 4, name: "dice-d4" },
    { id: 2, sides: 6, name: "dice-d6" },
    { id: 3, sides: 8, name: "dice-d8" },
    { id: 4, sides: 10, name: "dice-d10" },
    { id: 5, sides: 12, name: "dice-d12" },
    { id: 6, sides: 20, name: "dice-d20" },
    { id: 7, sides: 100, name: "dice-multiple" },
  ]);
  const [multipleRoll, setMultipleRoll] = useState([]);

  useEffect(() => {
    read();
  }, []);

  useEffect(() => {
    updateDiceSave();
  }, [dice]);

  const read = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("dice");
      let jsonData = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (jsonData != null) {
        setDice(jsonData);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  //updates the save file with dice
  const updateDiceSave = async () => {
    try {
      const jsonValue = JSON.stringify(dice);
      await AsyncStorage.setItem("dice", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DiceContext.Provider
      value={{ dice, setDice, multipleRoll, setMultipleRoll }}>
      {props.children}
    </DiceContext.Provider>
  );
};

export default DiceContextProvider;
