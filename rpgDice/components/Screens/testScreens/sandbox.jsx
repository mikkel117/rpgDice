import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Style from "../../../assets/styles/styles";

import NewReactTest from "./NewReactTest";

export default function Sandbox() {
  return (
    <SafeAreaView style={[styles.container]}>
      <NewReactTest />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
