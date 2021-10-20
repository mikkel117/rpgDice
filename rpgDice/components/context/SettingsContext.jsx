import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
  /*   const [settingsArray, setSettingsAray] = useState([]);
  useEffect(() => {
    read();
  }, []);

  useEffect(() => {
    setSettingsAray([{ value: firstTime }, { value: preSetDefoult }]);
    set();
  }, [firstTime, preSetDefoult]);

  read = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("settings");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (data != null) {
        console.log(data);
      } else {
        console.log("het");
      }
    } catch (e) {
      console.log("read error", e);
    }
  };

  set = async () => {
    try {
      const jsonValue = JSON.stringify(settingsArray);
      await AsyncStorage.setItem("settings", jsonValue);
    } catch (e) {
      console.log("set error", e);
    }
  }; */

  const [firstTime, setFirstTime] = useState(true);
  const [preSetDefoult, setPreSetDefoult] = useState(false);
  return (
    <SettingsContext.Provider
      value={{ firstTime, setFirstTime, preSetDefoult, setPreSetDefoult }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
