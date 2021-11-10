import React, { useContext, version } from "react";
import { Alert, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { SettingsContext } from "../context/SettingsContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditSettings({ navigation }) {
  const { setHistory } = useContext(HistoryContext);
  const { preSetDefault, setPreSetDefault, firstTime, setFirstTime } =
    useContext(SettingsContext);

  const withoutFolders = () => {
    setPreSetDefault(true);
    setFirstTime(false);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal isVisible={firstTime} coverScreen={false} style={{ flex: 1 }}>
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
              onPress={() => setFirstTime(false)}>
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
    </View>
  );
}
