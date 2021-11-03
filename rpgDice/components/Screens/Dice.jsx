import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Modal from "react-native-modal";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { DiceContext } from "../context/DiceContext";
import HistoryRoll from "../functions/HistoryRoll";

export default function Dice({ navigation }) {
  //saves all the thowes in the app as long as it is open
  const { history, setHistory, modalOpen, setModalOpen } =
    useContext(HistoryContext);
  const { dice, multipleRoll, setMultipleRoll, diceColor, setDiceColor } =
    useContext(DiceContext);

  //set the number of dices that needs to be thowen
  const [diceNumber, setDiceNumber] = useState(1);

  const [diceNumberInput, setDiecNumberInput] = useState(1);
  //see if the number of dice has been pressed
  const [diceInput, setDiceInput] = useState(false);
  //the curent dice
  const [curentDice, setCurentDice] = useState(0);
  //saves the buff
  const [buff, setBuff] = useState(0);

  const [uBuffInput, setUBuffInput] = useState(0);
  //see if the buff has been pressed
  const [buffInput, setBuffInput] = useState(false);

  const BuffInputCheck = (number) => {
    setDiceInput(true);
    if (number == 1) {
      setBuffInput(true);
    } else {
      setBuffInput(false);
    }
  };

  //sets the CurentDice to what is pressed on and then opens the roll modal
  const openRollModal = (id) => {
    let index = dice.findIndex((obj) => obj.id == id);
    setCurentDice(dice[index].sides);
    setModalOpen(true);
  };

  //check if the user has given a wrong input
  const ZeroCheck = () => {
    let diceNumber = diceNumberInput;
    let buff = uBuffInput;
    /* setDiceNumber(diceNumberInput); */
    /* setBuff(uBuffInput); */
    if (buffInput == true) {
      setBuff(buff);
      if (buff == "") {
        setBuff(0);
      }
    } else {
      setDiceNumber(diceNumber);
      if (diceNumber == "" || diceNumber < 0 || diceNumber == 0) {
        setDiceNumber(1);
      }
    }
    //sets the inputs to int(number)
    setDiceNumber((item) => parseInt(item));
    setBuff((item) => parseInt(item));
    setDiceInput(false);
  };

  const multipleDiceRoll = (item) => {
    let tiem = new Date();
    setMultipleRoll([
      ...multipleRoll,
      {
        id: tiem.toLocaleString(),
        name: item.name,
        sides: item.sides,
      },
    ]);

    if (diceColor == "white") {
      setDiceColor("green");
      setTimeout(() => {
        setDiceColor("white");
      }, 200);
    }
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <FlatList
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={true}
        data={dice}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dices}
            onPress={() => openRollModal(item.id)}
            onLongPress={() => multipleDiceRoll(item)}>
            <MaterialCommunityIcons
              name={item.name}
              size={50}
              color='black'
              style={{ textAlign: "center", color: "white" }}
            />
            <Text
              style={[
                Style.textColor,
                Style.DefaultFont,
                { textAlign: "center" },
              ]}>
              d{item.sides}
            </Text>
          </TouchableOpacity>
        )}
      />
      {HistoryRoll(diceNumber, curentDice, buff)}

      <Modal isVisible={diceInput} coverScreen={false} style={{ flex: 1 }}>
        <View style={Style.lightBackground}>
          {buffInput ? (
            <>
              <TextInput
                keyboardType='numeric'
                style={Style.input}
                placeholder='0'
                maxLength={3}
                placeholderTextColor='white'
                onChangeText={(val) => setUBuffInput(val)}
              />
            </>
          ) : (
            <TextInput
              keyboardType='numeric'
              style={Style.input}
              placeholder='1d'
              maxLength={3}
              placeholderTextColor='white'
              onChangeText={(val) => setDiecNumberInput(val)}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => setDiceInput(false)}>
              <Text style={Style.buttonStyle}>close</Text>
            </TouchableOpacity>

            <View style={{ flexBasis: "10%" }}></View>

            <TouchableOpacity
              onPress={() => {
                ZeroCheck();
              }}
              style={{ flexBasis: "45%" }}>
              <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                set
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: "row" }}>
        <View style={Style.DiceNBuffContainer}>
          <TouchableOpacity
            onPress={() => {
              if (diceNumber != 1) {
                setDiceNumber((diceNumber) => diceNumber - 1);
              }
            }}
            onLongPress={() => {
              setDiceNumber(1);
            }}>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>

          <Text style={Style.diceNBuff} onPress={() => BuffInputCheck(0)}>
            {diceNumber}d
          </Text>

          <TouchableOpacity
            onPress={() => {
              setDiceNumber((diceNumber) => diceNumber + 1);
            }}
            onLongPress={() => {
              setDiceNumber((diceNumber) => diceNumber + 10);
            }}>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>

        <View style={Style.DiceNBuffContainer}>
          <TouchableOpacity
            onPress={() => setBuff((buff) => buff - 1)}
            onLongPress={() => {
              setBuff(0);
            }}>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>

          <Text style={Style.diceNBuff} onPress={() => BuffInputCheck(1)}>
            {buff}
          </Text>
          <TouchableOpacity
            onPress={() => setBuff((buff) => buff + 1)}
            onLongPress={() => {
              setBuff((buff) => buff + 10);
            }}>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dices: {
    margin: 2,
    flexBasis: "24%",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
  },
});
