import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FolderContext = createContext();

const FolderContextProvider = (props) => {
  const [folder, setFolder] = useState([]);

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    set();
  }, [folder]);

  get = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("folders");
      let data = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (data != null) {
        setFolder(data);
      }
    } catch (e) {
      console.log("error in get", e);
    }
  };
  set = async () => {
    try {
      const jsonValue = JSON.stringify(folder);
      await AsyncStorage.setItem("folders", jsonValue);
    } catch (e) {
      console.log("error in set", e);
    }
  };

  return (
    <FolderContext.Provider value={{ folder, setFolder }}>
      {props.children}
    </FolderContext.Provider>
  );
};

export default FolderContextProvider;
