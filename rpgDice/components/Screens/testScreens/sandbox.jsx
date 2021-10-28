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
} from "react-native";
import Modal from "react-native-modal";
import { HistoryContext } from "../../context/HistoryContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Style from "../../../assets/styles/styles";

function Test(number) {
  const { modalOpen, setModalOpen } = useContext(HistoryContext);
  return (
    <>
      <Modal isVisible={modalOpen} style={{ margin: 0 }}>
        <View style={[Style.lightBackground]}>
          <Text style={[Style.DefaultFont, Style.textColor]}>{number}</Text>
          <Button title='close' onPress={() => setModalOpen(false)} />
        </View>
      </Modal>
    </>
  );
}

export default function Sandbox() {
  const { modalOpen, setModalOpen } = useContext(HistoryContext);
  const [number, setNumber] = useState(0);

  const openModal = () => {
    setNumber(Math.floor(Math.random() * 10) + 1);
    setModalOpen(true);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
        <Button title='click me' onPress={() => openModal()} />
      </View>
      {Test(number)}
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
