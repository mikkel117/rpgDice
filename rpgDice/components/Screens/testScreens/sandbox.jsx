import React, { useState, useEffect, useContext } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { HistoryContext } from "../../context/HistoryContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Style from "../../../assets/styles/styles";

export default function Sandbox() {
  const { history, setHistory } = useContext(HistoryContext);

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
  color: {
    fontSize: 20,
    color: "white",
  },
});
