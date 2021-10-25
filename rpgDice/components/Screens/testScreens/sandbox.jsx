import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
} from "react-native";

import Style from "../../../assets/styles/styles";
import Folders from "../Folders";

export default function Sandbox() {
  const [array, setArray] = useState([
    {
      id: 1,
      name: "Bob the wizard",
      items: [
        { id: 1, name: "Staff attack", numberOfDice: 1, dice: 20, buff: 3 },
      ],
    },
  ]);

  const test = () => {
    let time = new Date();
    let array = [
      {
        id: time.toLocaleString(),
        name: `test ${time.getTime()}`,
        numberOfDice: 2,
        dice: 30,
        buff: 20,
      },
    ];
    return array;
  };

  const update = () => {
    let testArray = test();
    const old = array[0].items;
    const updated = [...old, { testArray }];
    const clone = [...array];
    clone[0].items = updated;
    /*  console.log(clone); */
    setArray(clone);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Button title='click me' onPress={() => update()} />
        <Button title='click me' onPress={() => console.log(array)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
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
