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

import DiceIconSelect from "../functions/DiceIconSelect";
import Style from "../../assets/styles/styles";
import { DiceContext } from "../context/DiceContext";

export default function EditDice({ navigation }) {
  const { dice, setDice } = useContext(DiceContext);

  const [index, setIndex] = useState(0);

  const [newDice, setNewDice] = useState(false);
  const [diceVal, setDiceVal] = useState("");

  const [updateModal, setUpdateModal] = useState(false);
  const [diceInputPlaceholder, setDiceInputPlaceholder] =
    useState("Number of sides");

  const reset = () => {
    setIndex(0);
    setDiceVal("");
    setDiceInputPlaceholder("Number of sides");
    setUpdateModal(false);
  };

  const close = () => {
    reset();
    setNewDice(false);
  };

  //adds a new dice
  const addDice = () => {
    /* setDiceNumber((item) => parseInt(item)); */
    let diceValue = parseInt(diceVal);
    const time = new Date();
    if (diceVal == "") {
      diceValue = 4;
    }
    const icon = DiceIconSelect(diceValue);
    setDice([
      ...dice,
      {
        id: time.getTime(),
        sides: diceValue,
        name: icon,
      },
    ]);
    setNewDice(false);
    setDiceVal("");
  };

  //deletes a dice using its id
  const deleteDice = (id) => {
    setDice(dice.filter((item) => item.id != id));
  };

  //a alert that comes up before you can delete a dice
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

  //update dice
  const updateDice = () => {
    let diceValue = parseInt(diceVal);
    if (diceVal == "") {
      diceValue = 4;
    }
    const icon = DiceIconSelect(diceValue);
    dice[index].sides = diceValue;
    dice[index].name = icon;
    setDice([...dice]);
    setNewDice(false);
    reset();
  };

  //finds where a dice is in the array (the index of the dice) using its id.
  //and opens a modal
  const callUpdateDice = (id) => {
    let index = dice.findIndex((obj) => obj.id == id);
    setIndex(index);
    setDiceVal(dice[index].sides);
    setDiceInputPlaceholder(dice[index].sides);
    setUpdateModal(true);
    setNewDice(true);
  };

  //a alert for when the dice gets reset
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
          //sets the dice array to what it were to begain with
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
            style={[Style.input, Style.DefaultFont]}
            placeholder={`${diceInputPlaceholder}`}
            placeholderTextColor='white'
            maxLength={3}
            onChangeText={(val) => {
              if (val != "") {
                setDiceVal(val);
              }
            }}
          />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => close()}>
              <Text style={Style.buttonStyle}>close</Text>
            </TouchableOpacity>

            <View style={{ flexBasis: "10%" }}></View>

            {updateModal ? (
              <TouchableOpacity
                onPress={() => updateDice()}
                style={{ flexBasis: "45%" }}>
                <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                  Update dice
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => addDice()}
                style={{ flexBasis: "45%" }}>
                <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                  Add dice
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      <View style={{ alignItems: "center" }}>
        <Text style={[Style.textColor, Style.DefaultFont]}>
          create and edit dice here
        </Text>
        <TouchableOpacity onPress={() => setNewDice(true)}>
          <Ionicons name='create' size={30} color='white' />
        </TouchableOpacity>
      </View>

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
                      <Text style={[Style.textColor, Style.DefaultFont]}>
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
                      onPress={() => callUpdateDice(item.id)}>
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
            <Text style={[Style.textColor, Style.DefaultFont]}>Empty</Text>
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
    borderTopWidth: 1,
    marginVertical: 5,
    padding: 5,
    paddingVertical: 10,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
  },
});

{
}
