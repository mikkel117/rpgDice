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
  const [test, setTest] = useState(0);

  useEffect(() => {
    console.log(test);
  }, [test]);

  const roll = () => {
    let test1 = 0;
    for (let i = 0; i < 10; i++) {
      test1 = Math.floor(Math.random() * 10) + 1;
      console.log(test1);
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
      </View>
      <TouchableOpacity onPress={() => roll()}>
        <Text style={[Style.buttonStyle]}>click me</Text>
      </TouchableOpacity>

      <View style={{ height: 50 }}></View>

      <TouchableOpacity onPress={() => console.log(test)}>
        <Text style={[Style.buttonStyle]}>log</Text>
      </TouchableOpacity>
      <View style={{ height: 50 }}></View>
      <TouchableOpacity onPress={() => setTest([])}>
        <Text style={[Style.buttonStyle]}>reset</Text>
      </TouchableOpacity>
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
