/* import { StatusBar } from 'expo-status-bar'; */
import React from "react";
import Nav from "./components/Nav";

import HistoryContextProvider from "./components/context/HistoryContext";
import DiceContextProvider from "./components/context/DiceContext";
import SettingsContextProvider from "./components/context/SettingsContext";
import FolderContextProvider from "./components/context/FolderContext";
//icons
//https://icons.expo.fyi/
export default function App() {
  return (
    <FolderContextProvider>
      <SettingsContextProvider>
        <DiceContextProvider>
          <HistoryContextProvider>
            <Nav />
          </HistoryContextProvider>
        </DiceContextProvider>
      </SettingsContextProvider>
    </FolderContextProvider>
  );
}
