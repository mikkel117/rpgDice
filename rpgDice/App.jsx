/* import { StatusBar } from 'expo-status-bar'; */
import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import HistoryContextProvider from "./components/context/HistoryConstext";
import DiceContextProvider from "./components/context/DiceConstext";
import Sandbox from "./components/Screens/testScreens/sandbox";
//dice icons
//https://oblador.github.io/react-native-vector-icons/
//https://icons.expo.fyi/

//color wheel
//https://www.canva.com/colors/color-wheel/
export default function App() {
  return (
    // <Sandbox />
    <DiceContextProvider>
      <HistoryContextProvider>
        <Nav />
      </HistoryContextProvider>
    </DiceContextProvider>
  );
}
