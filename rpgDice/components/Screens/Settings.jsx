import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { SettingsContext } from "../context/SettingsContext";
import { DiceContext } from "../context/DiceContext";

export default function Settings() {
  const { setHistory } = useContext(HistoryContext);
  const { preSetDefault, setPreSetDefault, firstTime, setFirstTime } =
    useContext(SettingsContext);
  const { setDice } = useContext(DiceContext);

  const translation = useRef(new Animated.Value(0)).current;

  const [preSetDefaultToggle, setPreSetDefaultToggle] = useState();
  const [preSetDefaultColor, setPreSetDefaultColor] = useState("green");

  useEffect(() => {
    Animated.timing(translation, {
      toValue: preSetDefault ? 40 : 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (preSetDefault == true) {
      setPreSetDefaultToggle("on");
      setPreSetDefaultColor("green");
    } else {
      setPreSetDefaultToggle("off");
      setPreSetDefaultColor("red");
    }
    Animated.timing(translation, {
      toValue: preSetDefault ? 40 : 0,
      easing: Easing.bounce,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [preSetDefault]);

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
        <Pressable onPress={() => setPreSetDefault(!preSetDefault)}>
          <View
            style={{
              width: 70,
              height: 30,
              backgroundColor: `${preSetDefaultColor}`,
              borderRadius: 20,
            }}>
            <Animated.View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                backgroundColor: "white",
                transform: [{ translateX: translation }],
              }}
            />
          </View>
        </Pressable>
      </View>
      <View style={{ flexBasis: "25%" }}>
        <View style={{ borderBottomWidth: 2 }}>
          <Text
            style={[
              Style.textColor,
              { textAlign: "center", fontWeight: "bold", fontSize: 25 },
            ]}>
            DANGER ZONE
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}>
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
              <Text style={[Style.DefaultFont, Style.textColor]}>
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
              <Text style={[Style.DefaultFont, Style.textColor]}>
                DELETE ALL
              </Text>
              <Text style={[Style.DefaultFont, Style.textColor]}>SAVES</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
