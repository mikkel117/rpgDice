import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Style from "../../assets/styles/styles";

export default function FoldersPresets({ route, navigation }) {
  const { name, id, items } = route.params.data;
  /* useEffect(() => {
    JSON.stringify(name);
    JSON.stringify(id);
    JSON.stringify(items);
  }, []); */
  /* console.log(JSON.stringify(name)); */
  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <TouchableOpacity onPress={() => navigation.navigate("folders")}>
        <Text style={[Style.buttonStyle]}>go back to folders</Text>
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text style={[Style.defoultFont, Style.textColor]}>
          {JSON.stringify(name)}
        </Text>
      </View>
      <Text style={[Style.defoultFont, Style.textColor]}>folder presets</Text>
    </View>
  );
}
