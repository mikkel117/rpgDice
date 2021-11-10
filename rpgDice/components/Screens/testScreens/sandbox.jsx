import React, { useState, useEffect } from "react";
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

export default function Sandbox() {
  const [dice, setDice] = useState([]); // array of dice
  const [diceCount, setDiceCount] = useState(0); // number of dice
  const [diceType, setDiceType] = useState(0); // type of dice
  const [diceMod, setDiceMod] = useState(0); // modifier for dice
  const [diceRoll, setDiceRoll] = useState(0); // total of dice roll
  const [diceRolls, setDiceRolls] = useState([]); // array of dice rolls
  const [diceRollsCount, setDiceRollsCount] = useState(0); // number of dice rolls
  const [diceRollsTotal, setDiceRollsTotal] = useState(0); // total of dice rolls

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
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
  listItem: {
    borderWidth: 1,
    borderColor: "black",
  },
  /* style text */
  listItemText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    padding: 10,
  },
  listBodyItem: {
    fontSize: 20,
    color: "white",
  },
});
