import React, { useContext, version } from "react";
import { Alert, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { SettingsContext } from "../context/SettingsContext";

export default function settings({ navigation }) {
  const { setHistory } = useContext(HistoryContext);
  const { preSetDefoult, setPreSetDefoult, firstTime, setFirstTime } =
    useContext(SettingsContext);
  const deleteAlert = () => {
    Alert.alert(
      "DELETE HISTORY",
      "this will delete the history is what you want",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "delete", onPress: () => setHistory([]) },
      ]
    );
  };

  const withoutFolders = () => {
    setPreSetDefoult(true);
    setFirstTime(false);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal isVisible={firstTime} coverScreen={false} style={{ flex: 1 }}>
        <View style={Style.lightBackground}>
          <View style={{ alignItems: "center" }}>
            <Text style={[Style.defoultFont, Style.textColor]}>
              do you want to make presets folders or
            </Text>
            <Text style={[Style.defoultFont, Style.textColor]}>
              make presets without folders?
            </Text>
            <Text style={[Style.defoultFont, Style.textColor]}>
              both saves the presets.
            </Text>
            <Text style={[Style.defoultFont, Style.textColor]}>
              you can cange it later in settings.
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
            Style.defoultFont,
            { textAlign: "center", marginTop: 10 },
          ]}>
          welcome to edit screen
        </Text>

        {preSetDefoult ? (
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
      <View
        style={{
          flexBasis: "10%",
          flexDirection: "row",
          alignItems: "flex-end",
        }}>
        <TouchableOpacity
          style={{ flexBasis: "45%" }}
          onPress={() => setPreSetDefoult(!preSetDefoult)}>
          <Text style={[Style.buttonStyle, { padding: 5, fontSize: 15 }]}>
            toggle with/without
          </Text>
        </TouchableOpacity>

        <View style={{ flexBasis: "10%" }}></View>

        <TouchableOpacity
          onPress={() => deleteAlert()}
          style={{ flexBasis: "45%" }}>
          <Text
            style={[
              Style.textColor,
              {
                backgroundColor: "red",
                padding: 5,
                fontSize: 15,
                textAlign: "center",
              },
            ]}>
            DELETE HISTORT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
