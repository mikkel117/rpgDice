import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";

import Modal from "react-native-modal";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";
import { DiceContext } from "../context/DiceContext";

export default function Dice() {
  //saves all the thowes in the app as long as it is open
  const { history, setHistory } = useContext(HistoryContext);
  const { dice, setDice } = useContext(DiceContext);

  /*   const [newDice, setNewDice] = useState(false);
  const [diceVal, setDiceVal] = useState(); */

  //opens the modal to see the dice thow details
  const [modanOpen, setModanOpen] = useState(false);
  //set the number of dices that needs to be thowen
  const [diceNumber, setDiceNumber] = useState(1);

  const [diceNumberInput, setDiecNumberInput] = useState(1);
  //see if the number of dice has been pressed
  const [diceInput, setDiceInput] = useState(false);
  //the curent dice
  const [curentDice, setCurentDice] = useState();

  //the number that has been rolled
  const [rolled, setRolled] = useState([]);
  //saves the numbers + toghter
  const [plus, setPlus] = useState(0);

  //saves the buff
  const [buff, setBuff] = useState(0);

  const [uBuffInput, setUBuffInput] = useState(0);
  //see if the buff has been pressed
  const [buffInput, setBuffInput] = useState(false);
  //if the buff is + or -
  const [buffplus, setBuffPlus] = useState(false);

  useEffect(() => {
    //if rolled is now 0 then do this
    if (rolled != 0) {
      let Plus = 0;
      rolled.map((data) => {
        Plus += data.item;
      });
      Plus += buff;
      setPlus(Plus);
      History(Plus);
    }
    //ever time rolled is updated
  }, [rolled]);

  //if there is more then one dice
  const MultipleDices = (diceSides) => {
    let idk = [];
    for (let i = 0; i < diceNumber; i++) {
      idk.push({
        key: i,
        item: Math.floor(Math.random() * diceSides) + 1,
      });
    }
    setRolled(...rolled, idk);
    idk = [];
    setModanOpen(true);
  };

  //sets the history
  const History = (Plus) => {
    let time = new Date();

    setHistory([
      ...history,
      {
        createdAt: time.toLocaleTimeString(),
        key: time.getMilliseconds(),
        hNumberOfDice: diceNumber,
        hDice: curentDice,
        hRolled: rolled,
        hBuff: buff,
        hPlusEmAll: Plus,
      },
    ]);
  };

  //makes the dice that has been choisen
  const DiceChoice = (id) => {
    if (buff > 0) {
      setBuffPlus(true);
    } else {
      setBuffPlus(false);
    }

    let index = dice.findIndex((obj) => obj.id == id);
    let diceSides = dice[index].sides;
    setCurentDice(diceSides);

    //if diceNumber is over 1 calls a function with the sids of the dice. else make a new date and make how mutch there has been rolled and set it
    if (diceNumber > 1) {
      MultipleDices(diceSides);
    } else {
      let time = new Date();
      let Rolled = Math.floor(Math.random() * diceSides) + 1;
      setRolled([
        ...rolled,
        {
          key: time.getMilliseconds(),
          item: Rolled,
        },
      ]);
      setModanOpen(true);
    }
  };

  //check if buff or diceNumber has been pressed
  const BuffInputCheck = (id) => {
    setDiceInput(true);
    if (id == 1) {
      setBuffInput(true);
    } else {
      setBuffInput(false);
    }
  };

  //empty rolled and closes the modal
  const Close = () => {
    setRolled([]);
    setModanOpen(false);
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
            onPress={() => DiceChoice(item.id)}>
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

      <Modal isVisible={modanOpen} style={{ margin: 0 }}>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center" }}
          onPress={() => Close()}>
          <View style={Style.lightBackground}>
            <Text
              style={[
                Style.textColor,
                Style.DefaultFont,
                { textAlign: "center", paddingBottom: 5 },
              ]}>
              {diceNumber}d{curentDice}
              {buff ? <>{buffplus ? <>+{buff}</> : <>{buff}</>} </> : <></>}
            </Text>

            <Text
              style={[
                Style.textColor,
                { textAlign: "center", fontSize: 25, paddingBottom: 5 },
              ]}>
              {plus}
            </Text>

            <Text
              style={[
                Style.textColor,
                Style.DefaultFont,
                { textAlign: "center", paddingBottom: 5 },
              ]}>
              {rolled.map((data) => {
                return (
                  <Text key={data.key}>
                    {rolled.length == 1 ? <>{data.item}</> : <>{data.item},</>}
                  </Text>
                );
              })}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>

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

          <Text style={Style.diceNBuff} onPress={() => BuffInputCheck(2)}>
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
