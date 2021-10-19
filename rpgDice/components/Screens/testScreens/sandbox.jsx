import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Styles from "../../../assets/styles/styles";
import Style from "../../../assets/styles/styles";

//storage keys
//presets
//folders
//dice

const returnTest = () => {
  let number = Math.floor(Math.random() * 10) + 1;
  let returnNumbers;
  switch (number) {
    case 1:
      returnNumbers = 1;
      break;
    case 2:
      returnNumbers = 2;
      break;
    case 3:
      returnNumbers = 3;
      break;
    case 4:
      returnNumbers = 4;
      break;
    case 5:
      returnNumbers = 5;
      break;
    case 6:
      returnNumbers = 6;
      break;
    case 7:
      returnNumbers = 7;
      break;
    case 8:
      returnNumbers = 8;
      break;
    case 9:
      returnNumbers = 9;
      break;
    case 10:
      returnNumbers = 10;
      break;

    default:
      break;
  }
  return returnNumbers;
};

const callReturnTest = () => {
  let returnNumber = returnTest();
  console.log(returnNumber);
};

export default function Sandbox() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={[Style.textColor, { fontSize: 40 }]}>
          welcome to sandbox
        </Text>
      </View>
      <TouchableOpacity onPress={() => callReturnTest()}>
        <Text style={Style.buttonStyle}>click me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
  },
  color: {
    fontSize: 20,
    color: "white",
  },
});
