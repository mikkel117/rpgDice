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
    {
      id: 2,
      name: "Alex the Rogue",
      items: [
        { id: 1, name: "Dagger attack", numberOfDice: 1, dice: 20, buff: 7 },
      ],
    },
    {
      id: 3,
      name: "Peter the knight",
      items: [
        { id: 1, name: "Sword attack", numberOfDice: 1, dice: 20, buff: 10 },
      ],
    },
  ]);

  const test = () => {
    const old = array[0].items;
    const updated = [
      ...old,
      {
        id: 2,
        name: "test",
        numberOfDice: 2,
        dice: 30,
        buff: 20,
      },
    ];
    const clone = [...array];
    clone[0] = updated;
    /* console.log(clone); */
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
        <Button title='click me' onPress={() => test()} />
        <Button title='click me' onPress={() => console.log(array[0])} />
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
