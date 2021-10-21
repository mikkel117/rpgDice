import React from "react";
import { Alert, Text, View, TouchableOpacity } from "react-native";

import Style from "../../assets/styles/styles";

export default function settings() {
  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Text>welcome to settings</Text>
    </View>
  );
}
