/* import { StatusBar } from 'expo-status-bar'; */
import React from "react";
import Nav from "./components/Nav";

import HistoryContextProvider from "./components/context/HistoryContext";
import DiceContextProvider from "./components/context/DiceContext";
import SettingsContextProvider from "./components/context/SettingsContext";
import FolderContextProvider from "./components/context/FolderContext";
import Sandbox from "./components/Screens/testScreens/sandbox";
//dice icons
//https://oblador.github.io/react-native-vector-icons/
//https://icons.expo.fyi/

//color wheel
//https://www.canva.com/colors/color-wheel/
export default function App() {
  return (
    <HistoryContextProvider>
      <Sandbox />
    </HistoryContextProvider>

    // <FolderContextProvider>
    //   <SettingsContextProvider>
    //     <DiceContextProvider>
    //       <HistoryContextProvider>
    //         <Nav />
    //       </HistoryContextProvider>
    //     </DiceContextProvider>
    //   </SettingsContextProvider>
    // </FolderContextProvider>
  );
}
