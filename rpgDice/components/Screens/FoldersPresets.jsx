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
        <Text style={[Style.defoultFont, Style.textColor]}>{name}</Text>
      </View>
      {items.map((data) => {
        return (
          <View
            key={data.id}
            style={{
              height: 50,
              backgroundColor: "red",
              with: "100%",
              alignItems: "center",
            }}>
            <Text style={[Style.textColor, Style.defoultFont]}>
              {data.name}
            </Text>
            <Text style={[Style.defoultFont, Style.textColor]}>
              {data.numberOfDice}d{data.dice}+{data.buff}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
