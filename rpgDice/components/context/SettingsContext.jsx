import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
  const [folderQuestion, setFolderQuestion] = useState(true);
  const [preSetDefault, setPreSetDefault] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  useEffect(() => {
    read();
  }, []);

  useEffect(() => {
    set();
  }, [folderQuestion, preSetDefault]);

  read = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("settings");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (data != null) {
        setFolderQuestion(data[0].value);
        setPreSetDefault(data[1].value);
      }
    } catch (e) {
      console.log("read error", e);
    }
  };

  const testCall = () => {
    let settingsArray = [
      { name: "folderQuestion", value: folderQuestion },
      { name: "preset", value: preSetDefault },
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
      value={{
        folderQuestion,
        setFolderQuestion,
        preSetDefault,
        setPreSetDefault,
        firstTime,
        setFirstTime,
      }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
