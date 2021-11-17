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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { DiceContext } from "../context/DiceContext";
import { SettingsContext } from "../context/SettingsContext";
import DiceHistoryRoll from "../functions/DiceHistoryRoll";

export default function Dice({ navigation }) {
  //saves all the thowes in the app as long as it is open
  const { setModalOpen } = useContext(HistoryContext);
  const { dice, multipleRoll, setMultipleRoll, diceColor, setDiceColor } =
    useContext(DiceContext);
  const { firstTime, setFirstTime } = useContext(SettingsContext);

  //set the number of dices that needs to be thowen
  const [diceCount, setDiceCount] = useState(1);

  //imput for the number of dices
  const [diceCountInput, setDiceCountInput] = useState(1);
  //see if the number of dice has been pressed
  const [diceCountPressed, setDiceCountPressed] = useState(false);

  //current dice that is being thowen
  const [currentDice, setCurrentDice] = useState(0);

  //set the dice modifer
  const [diceModifier, setDiceModifier] = useState(0);

  //set the dice modifer input
  const [diceModifierInput, setDiceModifierInput] = useState(0);

  //see if the buff has been pressed
  const [diceModifierPressed, setDiceModifierPressed] = useState(false);

  const BuffInputCheck = (number) => {
    setDiceCountPressed(true);
    if (number == 1) {
      setDiceModifierPressed(true);
    } else {
      setDiceModifierPressed(false);
    }
  };

  //sets the currentDice to what is pressed on and then opens the roll modal
  const openRollModal = (id) => {
    let index = dice.findIndex((obj) => obj.id == id);
    setCurrentDice(dice[index].sides);
    setModalOpen(true);
  };

  //check if the user has given a wrong input
  const ZeroCheck = () => {
    let diceNumber = diceCountInput;
    let buff = diceModifierInput;
    if (diceModifierPressed == true) {
      setDiceModifier(buff);
      if (buff == "") {
        setDiceModifier(0);
      }
    } else {
      if (diceNumber == "" || diceNumber < 0 || diceNumber == 0) {
        setDiceCount(1);
      } else {
        setDiceCount(diceNumber);
      }
    }
    //sets the inputs to int(number)
    setDiceCount((item) => parseInt(item));
    setDiceModifier((item) => parseInt(item));
    setDiceCountPressed(false);
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
      {DiceHistoryRoll(diceCount, currentDice, diceModifier)}
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
      <Modal
        isVisible={firstTime}
        coverScreen={false}
        style={{ margin: 0, opacity: 10 }}>
        <View style={[styles.modal]}>
          <View style={[styles.modalContent, Style.lightBackground]}>
            <Text
              style={[Style.textColor, Style.DefaultFont, styles.modalHeader]}>
              Welcome to RPG Dice!
            </Text>
            <Text
              style={[
                Style.textColor,
                Style.DefaultFont,
                styles.modalText,
                {
                  textAlign: "center",
                  fontWeight: "bold",
                },
              ]}>
              This is a dice roller for RPG games.
            </Text>
            <View
              style={{
                borderWidth: 2,
                borderColor: "black",
                marginVertical: 15,
              }}
            />
            <Text
              style={[Style.textColor, Style.DefaultFont, styles.modalText]}>
              You can roll the dice by pressing it.
            </Text>
            <Text
              style={[Style.textColor, Style.DefaultFont, styles.modalText]}>
              You can add modifiers to the roll.
            </Text>
            <Text
              style={[Style.textColor, Style.DefaultFont, styles.modalText]}>
              You can add how many times you want to roll the dice.
            </Text>
            <Text
              style={[Style.textColor, Style.DefaultFont, styles.modalText]}>
              You can also roll multiple dice at the same time by pressing and
              holding the dice. Until the dice in the top right corner lights
              up.
            </Text>

            <TouchableOpacity
              style={[styles.modalButton]}
              onPress={() => {
                setFirstTime(false);
              }}>
              <Text style={[Style.textColor, Style.DefaultFont]}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={diceCountPressed}
        coverScreen={false}
        style={{ flex: 1 }}>
        <View style={Style.lightBackground}>
          {diceModifierPressed ? (
            <>
              <TextInput
                keyboardType='numeric'
                style={Style.input}
                placeholder='0'
                maxLength={3}
                placeholderTextColor='white'
                onChangeText={(val) => setDiceModifierInput(val)}
              />
            </>
          ) : (
            <TextInput
              keyboardType='numeric'
              style={Style.input}
              placeholder='1d'
              maxLength={3}
              placeholderTextColor='white'
              onChangeText={(val) => setDiceCountInput(val)}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => setDiceCountPressed(false)}>
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
              if (diceCount != 1) {
                setDiceCount((diceCount) => diceCount - 1);
              }
            }}
            onLongPress={() => {
              setDiceCount(1);
            }}>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>

          <Text style={Style.diceNBuff} onPress={() => BuffInputCheck(0)}>
            {diceCount}d
          </Text>

          <TouchableOpacity
            onPress={() => {
              setDiceCount((diceCount) => diceCount + 1);
            }}
            onLongPress={() => {
              setDiceCount((diceCount) => diceCount + 10);
            }}>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>

        <View style={Style.DiceNBuffContainer}>
          <TouchableOpacity
            onPress={() => setDiceModifier((diceModifier) => diceModifier - 1)}
            onLongPress={() => {
              setDiceModifier(0);
            }}>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>

          <Text style={Style.diceNBuff} onPress={() => BuffInputCheck(1)}>
            {diceModifier}
          </Text>
          <TouchableOpacity
            onPress={() => setDiceModifier((diceModifier) => diceModifier + 1)}
            onLongPress={() => {
              setDiceModifier((diceModifier) => diceModifier + 10);
            }}>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: "green",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
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
