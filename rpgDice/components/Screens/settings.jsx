import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import Style from "../../assets/styles/styles";

export default function settings({ navigation }) {
  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
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
  );
}
