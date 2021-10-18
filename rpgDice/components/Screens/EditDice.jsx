import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { DiceContext } from "../context/DiceConstext";

export default function EditDice({ navigation }) {
  const { dice, setDice } = useContext(DiceContext);

  const [index, setIndex] = useState(0);

  const [newDice, setNewDice] = useState(false);
  const [diceVal, setDiceVal] = useState("");
  const [diceChoice, setDiceChoice] = useState(false);

  const addDice = () => {
    var time = new Date();
    let diceValue = diceVal;
    if (diceValue == "") {
      diceValue = 4;
    }
    setDice([
      ...dice,
      {
        id: time.getTime(),
        sides: diceValue,
        name: "dice-1",
      },
    ]);
    setNewDice(false);
    setDiceVal("");
  };

  const zeroCheck = (val) => {
    if (val != "") {
      setDiceVal(val);
    }
  };

  const updateDice = () => {
    let diceValue = diceVal;
    if (diceValue == "") {
      diceValue = 4;
    }
    dice[index].sides = diceValue;
    setDice([...dice]);
    setDiceChoice(false);
    setDiceVal("");
  };

  const deleteDice = (id) => {
    setDice(dice.filter((item) => item.id != id));
  };

  const deleteAlert = (id) => {
    Alert.alert(
      "DELETE DICE",
      `this will delete all your custom dice d${dice[index].sides}`,
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

  const callDiceChose = (id) => {
    let index = dice.findIndex((obj) => obj.id == id);
    setIndex(index);
    setDiceVal(dice[index].sides);
    setDiceChoice(true);
  };

  const resetDice = () => {
    Alert.alert(
      "REASET DICE",
      "this will delete all your custom dice. are you sure you want that",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "delete",
          onPress: () =>
            setDice([
              { id: 1, sides: 4, name: "dice-d4" },
              { id: 2, sides: 6, name: "dice-d6" },
              { id: 3, sides: 8, name: "dice-d8" },
              { id: 4, sides: 10, name: "dice-d10" },
              { id: 5, sides: 12, name: "dice-d12" },
              { id: 6, sides: 20, name: "dice-d20" },
              { id: 7, sides: 100, name: "dice-multiple" },
            ]),
        },
      ]
    );
  };
  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal isVisible={newDice} coverScreen={false} style={{ flex: 1 }}>
        <View style={Style.lightBackground}>
          <TextInput
            keyboardType='number-pad'
            style={[Style.input, { fontSize: 20 }]}
            placeholder='Number of sides'
            placeholderTextColor='white'
            maxLength={3}
            onChangeText={(val) => setDiceVal(val)}
          />

          <TouchableOpacity onPress={() => addDice()}>
            <Text style={Style.buttonStyle}>Add dice</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={diceChoice} coverScreen={false} style={{ flex: 1 }}>
        <View style={Style.lightBackground}>
          <Text
            style={[
              Style.defoultFont,
              Style.textColor,
              { textAlign: "center" },
            ]}>
            d{dice[index].sides}
          </Text>
          <TextInput
            keyboardType='number-pad'
            style={[Style.input, Style.defoultFont]}
            placeholder={`d${dice[index].sides}`}
            placeholderTextColor='white'
            maxLength={3}
            onChangeText={(val) => zeroCheck(val)}
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setDiceChoice(false)}
              style={{ flexBasis: "45%" }}>
              <Text style={Style.buttonStyle}>Close</Text>
            </TouchableOpacity>

            <View style={{ flexBasis: "10%" }}></View>

            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => updateDice()}>
              <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <TouchableOpacity onPress={() => setNewDice(true)}>
          <Ionicons name='create' size={30} color='white' />
        </TouchableOpacity>
      </View>

      <Text style={[Style.textColor, { textAlign: "center" }]}>edit dice</Text>

      <View style={[{ flex: 1 }]}>
        {dice.length > 7 ? (
          <ScrollView>
            {dice.slice(7, dice.length).map((item) => {
              return (
                <View key={item.id} style={[styles.diceContainer]}>
                  <View
                    style={{
                      flexDirection: "row",
                      flexBasis: "50%",
                    }}>
                    <MaterialCommunityIcons
                      name={item.name}
                      size={50}
                      color='black'
                      style={{ textAlign: "center", color: "white" }}
                    />
                    <View style={{ justifyContent: "center" }}>
                      <Text style={[Style.textColor, { fontSize: 20 }]}>
                        d{item.sides}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexBasis: "50%",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}>
                    <TouchableOpacity onPress={() => deleteAlert(item.id)}>
                      <MaterialIcons name='delete' size={45} color='red' />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginLeft: 20 }}
                      onPress={() => callDiceChose(item.id)}>
                      <MaterialCommunityIcons
                        name='content-save-edit'
                        size={45}
                        color='white'
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={[Style.textColor, { fontSize: 20 }]}>Empty</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={() => resetDice()}
        style={{ alignSelf: "flex-end" }}>
        <Text
          style={[
            Style.buttonStyle,
            {
              backgroundColor: "red",
              fontSize: 15,
              padding: 5,
              paddingHorizontal: 20,
            },
          ]}>
          RESET DICE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dices: {
    margin: 2,
    flexBasis: "24%",
  },
  diceContainer: {
    borderBottomWidth: 1,
    margin: 5,
    padding: 5,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

{
  /* <View
style={{
  justifyContent: "space-between",
  flexDirection: "row",
  flexWrap: "wrap",
}}>
{dice.slice(7, dice.length).map((item) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={styles.dices}
      onPress={() => callDiceChose(item.id)}>
      <MaterialCommunityIcons
        name={item.name}
        size={50}
        color='black'
        style={{ textAlign: "center", color: "white" }}
      />
      <Text
        style={[
          Style.textColor,
          { textAlign: "center", fontSize: 20 },
        ]}>
        d{item.sides}
      </Text>
    </TouchableOpacity>
  );
})}
</View> */
}
