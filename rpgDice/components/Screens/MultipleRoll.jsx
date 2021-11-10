import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Modal from "react-native-modal";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { DiceContext } from "../context/DiceContext";
import { HistoryContext } from "../context/HistoryContext";
import { ScrollView, TextInput } from "react-native-gesture-handler";

export default function MultipleRoll({ navigation }) {
  const { multipleRoll, setMultipleRoll } = useContext(DiceContext);
  const { history, setHistory } = useContext(HistoryContext);

  const [buff, setBuff] = useState(0);
  const [buffInput, setBuffInput] = useState(0);
  const [diceNumber, setDiceNumber] = useState(1);
  const [diceInput, setDiceInput] = useState(1);
  const [isBuff, setIsBuff] = useState(false);
  const [inputModal, setInputModal] = useState(false);

  const [resoultArray, setResoultArray] = useState([]);

  const [resoultModal, setResoultModal] = useState(false);

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

  //a alert that comes up before you can empty multipleRoll
  const deleteAllAlert = () => {
    Alert.alert(
      "EMPTY MULTIPLE ROLL",
      `you are about to EMPTY multiple roll is this what you want`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "empty",
          onPress: () => setMultipleRoll([]),
        },
      ]
    );
  };

  const openInputModal = (number) => {
    if (number == 0) {
      setIsBuff(false);
    } else {
      setIsBuff(true);
    }
    setInputModal(true);
  };

  const setInput = () => {
    if (isBuff == true) {
      setBuff(buffInput);
      if (buff == "") {
        setBuff(0);
      }
      setBuff((item) => parseInt(item));
    } else {
      const dice = diceInput;
      if (dice == "" || dice < 0 || dice == 0) {
        setDiceNumber(1);
      } else {
        setDiceNumber(dice);
      }
      setDiceNumber((item) => parseInt(item));
    }
    setInputModal(false);
  };

  const rollArray = () => {
    let multipleArray = [];
    let rollNumber = 1;
    let historyArray = [];
    for (let i = 0; i < multipleRoll.length; i++) {
      let puchArray = [];
      let resoult = 0;

      for (let j = 0; j < diceNumber; j++) {
        puchArray.push({
          key: j,
          item: Math.floor(Math.random() * multipleRoll[i].sides) + 1,
        });
      }
      let plus = 0;
      puchArray.map((data) => {
        plus += data.item;
      });
      resoult = plus + buff;
      multipleArray = [
        ...multipleArray,
        {
          id: i,
          item: resoult,
          dice: multipleRoll[i].name,
          sides: multipleRoll[i].sides,
          array: puchArray,
          rollNumber: rollNumber,
        },
      ];
      historyArray = [...historyArray, ...creatHistory(puchArray, i, resoult)];
      /* setTheHistory(puchArray, i, resoult); */
      puchArray = [];
      rollNumber++;
    }
    setResoultArray(multipleArray);
    setHistory([...history, ...historyArray]);
    setResoultModal(true);
  };

  const creatHistory = (puchArray, i, resoult) => {
    let test = [];
    let time = new Date();
    test = [
      {
        createdAt: time.toLocaleTimeString(),
        key: time.getMilliseconds(),
        hNumberOfDice: diceNumber,
        hDice: multipleRoll[i].sides,
        hRolled: puchArray,
        hBuff: buff,
        hPlusEmAll: resoult,
      },
    ];
    return test;
  };

  const closeRollModal = () => {
    setResoultArray([]);
    setResoultModal(false);
  };
  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal isVisible={resoultModal} style={{ margin: 0 }}>
        <SafeAreaView
          style={[
            Style.lightBackground,
            {
              flex: 1,
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            },
          ]}>
          <ScrollView>
            {resoultArray.map((data) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    marginVertical: 10,
                    flexDirection: "row",
                    marginVertical: 10,
                  }}
                  key={data.id}>
                  <View
                    style={[
                      {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}>
                    <Text style={[Style.textColor, { fontSize: 25 }]}>
                      #{data.rollNumber}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        paddingVertical: 10,
                      },
                    ]}>
                    <Text
                      style={[
                        Style.textColor,
                        { fontSize: 30, fontWeight: "bold" },
                      ]}>
                      {data.item}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}>
                    <MaterialCommunityIcons
                      name={data.dice}
                      size={40}
                      color='white'
                    />
                    <Text
                      style={[
                        Style.textColor,
                        { textAlign: "center", fontSize: 15 },
                      ]}>
                      d{data.sides}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <TouchableOpacity onPress={() => closeRollModal()}>
            <Text
              style={[Style.buttonStyle, { fontSize: 25, fontWeight: "bold" }]}>
              close
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      <Modal isVisible={inputModal} style={{ margin: 0 }}>
        <View style={[Style.lightBackground]}>
          {isBuff ? (
            <TextInput
              keyboardType='numeric'
              style={Style.input}
              placeholder={`${buff}`}
              maxLength={3}
              placeholderTextColor='white'
              onChangeText={(val) => setBuffInput(val)}
            />
          ) : (
            <TextInput
              keyboardType='numeric'
              style={Style.input}
              placeholder={`${diceNumber}`}
              maxLength={3}
              placeholderTextColor='white'
              onChangeText={(val) => setDiceInput(val)}
            />
          )}

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => setInputModal(false)}>
              <Text style={[Style.buttonStyle]}>close</Text>
            </TouchableOpacity>
            <View style={{ flexBasis: "10%" }}></View>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => setInput()}>
              <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                set
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {multipleRoll.length > 0 ? (
        <View
          style={{
            /*  alignItems: "flex-end", */
            borderBottomWidth: 2,
            borderColor: "gray",
            marginBottom: 10,
            flexDirection: "row",
          }}>
          <View style={{ flexBasis: "45%", alignItems: "flex-start" }}>
            <TouchableOpacity onPress={() => rollArray()}>
              <Text style={[Style.buttonStyle, { width: 100, margin: 10 }]}>
                Roll
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexBasis: "10%" }}></View>

          <View style={{ flexBasis: "45%", alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => deleteAllAlert()}>
              <Text
                style={[
                  Style.buttonStyle,
                  { width: 100, margin: 10, backgroundColor: "red" },
                ]}>
                EMPTY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
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
      <View style={{ flexDirection: "row" }}>
        <View style={[Style.DiceNBuffContainer, { flexBasis: "50%" }]}>
          <TouchableOpacity
            onPress={() => {
              if (diceNumber != 1) {
                setDiceNumber((diceNumber) => diceNumber - 1);
              }
            }}>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>
          <Text style={[Style.diceNBuff]} onPress={() => openInputModal(0)}>
            {diceNumber}d
          </Text>
          <TouchableOpacity
            onPress={() => setDiceNumber((diceNumber) => diceNumber + 1)}>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>

        <View style={[Style.DiceNBuffContainer, { flexBasis: "50%" }]}>
          <TouchableOpacity onPress={() => setBuff((buff) => buff - 1)}>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>
          <Text style={[Style.diceNBuff]} onPress={() => openInputModal(1)}>
            {buff}
          </Text>
          <TouchableOpacity onPress={() => setBuff((buff) => buff + 1)}>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
