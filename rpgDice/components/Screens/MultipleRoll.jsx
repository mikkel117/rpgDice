import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { DiceContext } from "../context/DiceContext";
import { ScrollView, TextInput } from "react-native-gesture-handler";

export default function MultipleRoll({ navigation }) {
  const { multipleRoll, setMultipleRoll } = useContext(DiceContext);

  const [buff, setBuff] = useState(10);
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
  };

  const rollArray = () => {
    const time = new Date();
    let multipleArray = [];
    let rollNumber = 1;
    for (let i = 0; i < multipleRoll.length; i++) {
      let puchArray = [];
      let resoult = 0;

      for (let i = 0; i < diceNumber; i++) {
        puchArray.push({
          key: i,
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
          id: time.toLocaleString(),
          item: resoult,
          dice: multipleRoll[i].name,
          array: puchArray,
          rollNumber: rollNumber,
        },
      ];
      puchArray = [];
      rollNumber++;
    }
    setResoultArray(multipleArray);
    setResoultModal(true);
  };

  const closeRollModal = () => {
    setResoultArray([]);
    setResoultModal(false);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal isVisible={resoultModal} style={{ margin: 0 }}>
        <TouchableOpacity
          onPress={() => closeRollModal()}
          style={{ flex: 1, justifyContent: "center" }}>
          <View style={[Style.lightBackground, { flex: 1 }]}>
            <ScrollView>
              {resoultArray.map((data) => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      marginVertical: 10,
                      flexDirection: "row",
                      /* marginHorizontal: 10, */
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
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity onPress={() => console.log(resoultArray)}>
              <Text style={Style.buttonStyle}>log</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => rollArray()}>
            <Text style={[Style.buttonStyle, { width: 100, margin: 10 }]}>
              Roll
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>
          <Text style={[Style.diceNBuff]} onPress={() => openInputModal(0)}>
            {diceNumber}d
          </Text>
          <TouchableOpacity>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>

        <View style={[Style.DiceNBuffContainer, { flexBasis: "50%" }]}>
          <TouchableOpacity>
            <AntDesign name='minuscircle' size={30} color='white' />
          </TouchableOpacity>
          <Text style={[Style.diceNBuff]} onPress={() => openInputModal(1)}>
            {buff}
          </Text>
          <TouchableOpacity>
            <AntDesign name='pluscircle' size={30} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
