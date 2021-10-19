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

export default function Sandbox() {
  const [number, setNumber] = useState(0);

  const Plus = () => {
    /* setPlus(100); */
    if (number != 100 && number < 100) {
      setNumber((number) => number + 20);
      if (number > 100) {
        setNumber(100);
      }
    }
  };
  const Minus = () => {
    if (number != 0) {
      setNumber((number) => number - 10);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <Text style={[Style.textColor, { fontSize: 40 }]}>
          welcome to sandbox
        </Text>
      </View>
      <TouchableOpacity
        onLongPress={() => Plus()}
        onPress={() => setNumber((number) => number + 1)}
        style={{ borderWidth: 2 }}>
        <Text style={Style.buttonStyle}>+</Text>
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Text style={[Style.textColor, Style.defoultFont]}>{number}</Text>
      </View>

      <TouchableOpacity
        onLongPress={() => Minus()}
        onPress={() => setNumber((number) => number - 1)}
        style={{ borderWidth: 2 }}>
        <Text style={Style.buttonStyle}>-</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
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
