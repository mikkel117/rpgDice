import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
  const [firstTime, setFirstTime] = useState(true);
  const [preSetDefoult, setPreSetDefoult] = useState(false);
  /* const [settingsArray, setSettingsArray] = useState([]) */
  useEffect(() => {
    read();
  }, []);

  useEffect(() => {
    set();
  }, [firstTime, preSetDefoult]);

  read = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("settings");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (data != null) {
        setFirstTime(data[0].value);
        setPreSetDefoult(data[1].value);
      }
    } catch (e) {
      console.log("read error", e);
    }
  };

  const testCall = () => {
    let settingsArray = [
      { name: "first time", value: firstTime },
      { name: "preset", value: preSetDefoult },
    ];

    return settingsArray;
  };

  set = async () => {
    try {
      const array = testCall();
      const jsonValue = JSON.stringify(array);
      await AsyncStorage.setItem("settings", jsonValue);
    } catch (e) {
      console.log("set error", e);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ firstTime, setFirstTime, preSetDefoult, setPreSetDefoult }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
