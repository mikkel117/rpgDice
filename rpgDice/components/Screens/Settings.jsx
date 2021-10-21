import React, { useContext } from "react";
import { Alert, Text, View, TouchableOpacity } from "react-native";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { SettingsContext } from "../context/SettingsContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const { setHistory } = useContext(HistoryContext);
  const { preSetDefoult, setPreSetDefoult, firstTime, setFirstTime } =
    useContext(SettingsContext);
  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <View style={{ flex: 1 }}>
        {preSetDefoult ? (
          <TouchableOpacity onPress={() => setPreSetDefoult(false)}>
            <Text style={[Style.buttonStyle]}>
              set defouldt preset to with folders
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setPreSetDefoult(true)}>
            <Text style={[Style.buttonStyle]}>
              set defouldt preset to without folders
            </Text>
          </TouchableOpacity>
        )}
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
          <TouchableOpacity>
            <Text style={[Style.buttonStyle, { backgroundColor: "red" }]}>
              DELETE HISTORT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
