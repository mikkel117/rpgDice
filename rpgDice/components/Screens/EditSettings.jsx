import React, { useContext, useEffect, version, useRef, useState } from "react";
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { SettingsContext } from "../context/SettingsContext";
import { DiceContext } from "../context/DiceContext";
import { FolderContext } from "../context/FolderContext";

export default function EditSettings({ navigation, route }) {
  const { setHistory } = useContext(HistoryContext);
  const {
    preSetDefault,
    setPreSetDefault,
    folderQuestion,
    setFolderQuestion,
    setFirstTime,
  } = useContext(SettingsContext);
  const { setDice } = useContext(DiceContext);
  const { setFolder } = useContext(FolderContext);
  const translation = useRef(new Animated.Value(0)).current;

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
      setPreSetDefaultColor("green");
    } else {
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
    setPreSetDefault(false);
    setFolderQuestion(true);
    setHistory([]);
    setFolder([]);
    Animated.timing(translation, {
      toValue: preSetDefault ? 0 : 0,
      easing: Easing.bounce,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    deleteAllSaves();
  };

  const deleteAllSaves = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log("delete all saves error", e);
    }
  };

  const withoutFolders = () => {
    setPreSetDefault(true);
    setFolderQuestion(false);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal isVisible={folderQuestion} coverScreen={false} style={{ flex: 1 }}>
        <View style={Style.lightBackground}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[
                Style.DefaultFont,
                Style.textColor,
                { textAlign: "center" },
              ]}>
              do you want to make presets with folders? or without folders? (you
              can change this later in settings)
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => withoutFolders()}>
              <Text style={[Style.buttonStyle]}>without folders</Text>
            </TouchableOpacity>
            <View style={{ flexBasis: "10%" }}></View>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => setFolderQuestion(false)}>
              <Text style={[Style.buttonStyle]}>with folders</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            Style.textColor,
            Style.DefaultFont,
            { textAlign: "center", marginTop: 10 },
          ]}>
          welcome to edit screen
        </Text>

        {preSetDefault ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("preset")}
            style={{ borderWidth: 2, marginVertical: 10 }}>
            <Text style={Style.buttonStyle}>go to presets</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("folders")}
            style={{ borderWidth: 2, marginVertical: 10 }}>
            <Text style={Style.buttonStyle}>go to folders</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("EditDice")}
          style={{ borderWidth: 2 }}>
          <Text style={Style.buttonStyle}>go to edit dice</Text>
        </TouchableOpacity>
      </View>

      <View style={[{ flex: 0.7, borderTopWidth: 5 }]}>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}>
          <Text style={[Style.DefaultFont, Style.textColor, {}]}>
            use presets as default
          </Text>
          <Pressable onPress={() => setPreSetDefault(!preSetDefault)}>
            <View
              style={{
                width: 65,
                height: 25,
                backgroundColor: `${preSetDefaultColor}`,
                borderRadius: 20,
              }}>
              <Animated.View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 20,
                  backgroundColor: "white",
                  transform: [{ translateX: translation }],
                }}
              />
            </View>
          </Pressable>
        </View>

        <View style={{ flexBasis: "50%" }}>
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
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}>
                <Text
                  style={[
                    Style.DefaultFont,
                    Style.textColor,
                    { fontSize: 15, fontWeight: "bold" },
                  ]}>
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
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}>
                <Text
                  style={[
                    Style.DefaultFont,
                    Style.textColor,
                    { textAlign: "center", fontSize: 15, fontWeight: "bold" },
                  ]}>
                  DELETE ALL SAVES (WARNING)
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
