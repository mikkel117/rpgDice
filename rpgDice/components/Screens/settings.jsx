import React, { useContext } from "react";
import { Alert, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryConstext";

export default function settings({ navigation }) {
  const { setHistory } = useContext(HistoryContext);
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

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            Style.textColor,
            Style.defoultFont,
            { textAlign: "center", marginTop: 10 },
          ]}>
          welcome to edit screen
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("preset")}
          style={{ borderWidth: 2, marginVertical: 10 }}>
          <Text style={Style.buttonStyle}>go to preSet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditDice")}
          style={{ borderWidth: 2 }}>
          <Text style={Style.buttonStyle}>go to edit dice</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexBasis: "10%",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}>
        <TouchableOpacity onPress={() => deleteAlert()}>
          <Text
            style={[
              Style.textColor,
              { backgroundColor: "red", padding: 5, fontSize: 15 },
            ]}>
            DELETE HISTORT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
