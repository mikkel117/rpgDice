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
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <Text style={[Style.textColor, { fontSize: 40 }]}>
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
