import React, { useContext, useState, useEffect, version } from "react";
import { Alert, Text, View, TouchableOpacity } from "react-native";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { SettingsContext } from "../context/SettingsContext";
import { DiceContext } from "../context/DiceContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const { setHistory } = useContext(HistoryContext);
  const { preSetDefoult, setPreSetDefoult, firstTime, setFirstTime } =
    useContext(SettingsContext);
  const { setDice } = useContext(DiceContext);

  const [preSetDefoultToggle, setPreSetDefoultToggle] = useState();
  const [preSetDefoultColor, setPreSetDefoultColor] = useState("green");

  useEffect(() => {
    if (preSetDefoult == true) {
      setPreSetDefoultToggle("on");
      setPreSetDefoultColor("green");
    } else {
      setPreSetDefoultToggle("off");
      setPreSetDefoultColor("red");
    }
  }, [preSetDefoult]);

  const deleteHistorieAlert = () => {
    Alert.alert(
      "DELETE HISTORY",
      "this will delete the history is this what you want?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "delete", onPress: () => setHistory([]) },
      ]
    );
  };

  const deleteAllSavesAlert = () => {
    Alert.alert(
      "DELETE ALL SAVES",
      "this will delete ALL saves fx. Presets and dice is this what you want?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "delete", onPress: () => callDeleteAndReset() },
      ]
    );
  };

  const callDeleteAndReset = () => {
    setDice([
      { id: 1, sides: 4, name: "dice-d4" },
      { id: 2, sides: 6, name: "dice-d6" },
      { id: 3, sides: 8, name: "dice-d8" },
      { id: 4, sides: 10, name: "dice-d10" },
      { id: 5, sides: 12, name: "dice-d12" },
      { id: 6, sides: 20, name: "dice-d20" },
      { id: 7, sides: 100, name: "dice-multiple" },
    ]);
    deleteAllSaves();
  };

  deleteAllSaves = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log("delete all saves error", e);
    }
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity onPress={() => setPreSetDefoult(!preSetDefoult)}>
          <Text
            style={[
              Style.buttonStyle,
              { backgroundColor: `${preSetDefoultColor}` },
            ]}>
            {preSetDefoultToggle}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexBasis: "25%" }}>
        <View style={{ borderBottomWidth: 1 }}>
          <Text
            style={[
              Style.textColor,
              { textAlign: "center", fontWeight: "bold", fontSize: 25 },
            ]}>
            DANGER ZONE
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ flexBasis: "45%" }}
            onPress={() => deleteHistorieAlert()}>
            <View
              style={[
                {
                  backgroundColor: "red",
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}>
              <Text style={[Style.defoultFont, Style.textColor]}>
                DELETE HISTORIE
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexBasis: "10%" }}></View>
          <TouchableOpacity
            style={{ flexBasis: "45%" }}
            onPress={() => deleteAllSavesAlert()}>
            <View
              style={[
                {
                  backgroundColor: "red",
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}>
              <Text style={[Style.defoultFont, Style.textColor]}>
                DELETE ALL
              </Text>
              <Text style={[Style.defoultFont, Style.textColor]}>SAVES</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
