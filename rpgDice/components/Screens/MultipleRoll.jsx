import React, { useContext, useEffect, useState } from "react";
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
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";

export default function MultipleRoll({ navigation }) {
  const { multipleRoll, setMultipleRoll } = useContext(DiceContext);
  const { history, setHistory } = useContext(HistoryContext);

  const [diceModifier, setDiceModifier] = useState(0);
  const [diceModifierInput, setDiceModifierInput] = useState(0);
  const [diceCount, setDiceCount] = useState(1);
  const [diceInput, setDiceInput] = useState(1);
  const [isDiceModifier, setIsDiceModifier] = useState(false);
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
      setIsDiceModifier(false);
    } else {
      setIsDiceModifier(true);
    }
    setInputModal(true);
  };

  const setInput = () => {
    if (isDiceModifier == true) {
      setDiceModifier(diceModifierInput);
      if (diceModifier == "") {
        setDiceModifier(0);
      }
      setDiceModifier((item) => parseInt(item));
    } else {
      const dice = diceInput;
      if (dice == "" || dice < 0 || dice == 0) {
        setDiceCount(1);
      } else {
        setDiceCount(dice);
      }
      setDiceCount((item) => parseInt(item));
    }
    setInputModal(false);
  };

  const rollArray = () => {
    let multipleArray = [];
    let rollNumber = 1;
    let historyArray = [];
    const time = new Date();
    for (let i = 0; i < multipleRoll.length; i++) {
      let puchArray = [];
      let resoult = 0;

      for (let j = 0; j < diceCount; j++) {
        puchArray.push({
          key: j,
          item: Math.floor(Math.random() * multipleRoll[i].sides) + 1,
        });
      }
      let plus = 0;
      puchArray.map((data) => {
        plus += data.item;
      });
      resoult = plus + diceModifier;
      multipleArray = [
        ...multipleArray,
        {
          id: rollNumber,
          item: resoult,
          dice: multipleRoll[i].name,
          sides: multipleRoll[i].sides,
          array: puchArray,
          rollNumber: rollNumber,
        },
      ];
      historyArray = [...historyArray, ...creatHistory(puchArray, i, resoult)];
      puchArray = [];
      rollNumber++;
    }
    setResoultArray(multipleArray);
    setHistory([...history, ...historyArray]);
    setResoultModal(true);
  };

  const creatHistory = (puchArray, i, resoult) => {
    let returnArray = [];
    let time = new Date();
    returnArray = [
      {
        createdAt: time.toLocaleTimeString(),
        key: time.getMilliseconds(),
        diceCount: diceCount,
        dice: multipleRoll[i].sides,
        rollArray: puchArray,
        diceModifier: diceModifier,
        rollTotal: resoult,
      },
    ];
    setTimeout(() => {}, 1000);
    return returnArray;
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
          <FlatList
            data={resoultArray}
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  marginVertical: 10,
                  flexDirection: "row",
                  marginVertical: 10,
                }}>
                <View
                  style={[
                    {
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}>
                  <Text style={[Style.textColor, { fontSize: 25 }]}>
                    #{item.rollNumber}
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
                    {item.item}
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
                    name={item.dice}
                    size={40}
                    color='white'
                  />
                  <Text
                    style={[
                      Style.textColor,
                      { textAlign: "center", fontSize: 15 },
                    ]}>
                    d{item.sides}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
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
          {isDiceModifier ? (
            <TextInput
              keyboardType='numeric'
              style={Style.input}
              placeholder={`${diceModifier}`}
              maxLength={3}
              placeholderTextColor='white'
              onChangeText={(val) => setDiceModifierInput(val)}
            />
          ) : (
            <TextInput
              keyboardType='numeric'
              style={Style.input}
              placeholder={`${diceCount}`}
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
        <FlatList
          data={multipleRoll}
          renderItem={({ item }) => (
            <View
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
                    name={item.name}
                    size={50}
                    color='white'
                  />
                </View>
                <View style={{ justifyContent: "center", marginLeft: 10 }}>
                  <Text style={[Style.textColor, Style.DefaultFont]}>
                    d{item.sides}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}>
                <TouchableOpacity onPress={() => deleteAlert(item.id)}>
                  <MaterialIcons name='delete' size={50} color='red' />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
              if (diceCount != 1) {
                setDiceCount((diceCount) => diceCount - 1);
              }
            }}>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>
          <Text style={[Style.diceNBuff]} onPress={() => openInputModal(0)}>
            {diceCount}d
          </Text>
          <TouchableOpacity
            onPress={() => setDiceCount((diceCount) => diceCount + 1)}>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>

        <View style={[Style.DiceNBuffContainer, { flexBasis: "50%" }]}>
          <TouchableOpacity
            onPress={() => setDiceModifier((diceModifier) => diceModifier - 1)}>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>
          <Text style={[Style.diceNBuff]} onPress={() => openInputModal(1)}>
            {diceModifier}
          </Text>
          <TouchableOpacity
            onPress={() => setDiceModifier((diceModifier) => diceModifier + 1)}>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
