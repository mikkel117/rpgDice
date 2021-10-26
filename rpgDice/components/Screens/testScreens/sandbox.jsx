import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Style from "../../../assets/styles/styles";
import PresetStyle from "../../../assets/styles/PresetStyle";

export default function Sandbox() {
  const [time, setTime] = useState("");

  useEffect(() => {
    let time = new Date();
    setTime(time.toLocaleString());
  }, []);
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
      </View>
      <View style={[PresetStyle.presetContainer, {}]}>
        <View style={PresetStyle.diceButtonContainer}>
          <View style={[PresetStyle.diceContainer]}>
            <MaterialCommunityIcons name='dice-d12' size={50} color='white' />
          </View>
          <View style={[PresetStyle.buttonContainer]}>
            <Text style={[PresetStyle.buttonText]}>some text</Text>
            <TouchableOpacity>
              <Text style={[PresetStyle.button]}>roll</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[PresetStyle.deleteEditcontainer]}>
          <Text style={[PresetStyle.name]}>{time}</Text>
          <View style={[PresetStyle.deleteEditWrapper]}>
            <TouchableOpacity>
              <MaterialIcons name='delete' size={40} color='red' />
            </TouchableOpacity>

            <TouchableOpacity>
              <MaterialCommunityIcons
                name='content-save-edit'
                size={40}
                color='white'
              />
            </TouchableOpacity>
          </View>
        </View>
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
