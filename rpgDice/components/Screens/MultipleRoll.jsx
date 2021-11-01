import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { DiceContext } from "../context/DiceContext";
import { ScrollView } from "react-native-gesture-handler";

export default function MultipleRoll({ navigation }) {
  const { multipleRoll, setMultipleRoll } = useContext(DiceContext);

  const deleteDice = (id) => {
    setMultipleRoll(multipleRoll.filter((item) => item.id != id));
  };

  //a alert that comes up before you can delete a dice
  const deleteAlert = (id) => {
    const index = multipleRoll.findIndex((obj) => obj.id == id);
    Alert.alert(
      "DELETE DICE",
      `you are about to delete a dice with ${multipleRoll[index].sides} sides from multiple roll are you sure you want to do that`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "delete",
          onPress: () => deleteDice(id),
        },
      ]
    );
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <View style={{ alignItems: "center" }}>
        <Text style={[Style.textColor, Style.DefaultFont]}>
          welcome to multiple roll
        </Text>
      </View>

      {multipleRoll.length > 0 ? (
        <ScrollView>
          {multipleRoll.map((data) => {
            return (
              <View
                key={data.id}
                style={{
                  padding: 10,
                  marginBottom: 10,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "gray",
                  flexDirection: "row",
                }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View>
                    <MaterialCommunityIcons
                      name={data.name}
                      size={50}
                      color='white'
                    />
                  </View>
                  <View style={{ justifyContent: "center", marginLeft: 10 }}>
                    <Text style={[Style.textColor, Style.DefaultFont]}>
                      d{data.sides}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}>
                  <TouchableOpacity onPress={() => deleteAlert(data.id)}>
                    <MaterialIcons name='delete' size={50} color='red' />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={[Style.DefaultFont, Style.textColor]}>Empty</Text>
        </View>
      )}
    </View>
  );
}
