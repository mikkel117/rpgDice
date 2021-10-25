import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { DiceContext } from "../context/DiceContext";
import { HistoryContext } from "../context/HistoryContext";

export default function presets({ navigation }) {
  const { dice } = useContext(DiceContext);
  const { history, setHistory } = useContext(HistoryContext);

  const [preSet, setPreSet] = useState([]);
  const [newPreSet, setNewPreSet] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  const [buff, setBuff] = useState(0);

  const [name, setName] = useState("");

  const [color, setColor] = useState("white");

  const [selectedDice, setSelectedDice] = useState(0);

  const [updateModal, setUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(0);

  const [rollPreSetModal, setRollPreSetModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [rollArray, setRollArray] = useState([]);

  const [diceIcon, setDiceIcon] = useState();

  //checks the platform and if it is android it will set color to black
  //it will also call read
  useEffect(() => {
    if (Platform.OS == "android") {
      setColor("black");
    }
    read();
  }, []);
  //call updatePresetSave every time preSet is change
  useEffect(() => {
    updatePersetSave();
  }, [preSet]);

  //search the save file for the key presets and if it is not empty setPreSet to what it finds
  const read = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("presets");
      let jsonData = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (jsonData != null) {
        setPreSet(jsonData);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  //updates the save file with preSet
  const updatePersetSave = async () => {
    try {
      const jsonValue = JSON.stringify(preSet);
      await AsyncStorage.setItem("presets", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  //a switch that returns a icon name
  const diceIconSelect = () => {
    let diceIcon;
    switch (selectedDice) {
      case 4:
        diceIcon = "dice-4";
        break;
      case 6:
        diceIcon = "dice-6";
        break;
      case 8:
        diceIcon = "dice-d8";
        break;
      case 10:
        diceIcon = "dice-d10";
        break;
      case 12:
        diceIcon = "dice-d12";
        break;
      case 20:
        diceIcon = "dice-d20";
        break;
      case 100:
        diceIcon = "dice-multiple";
        break;
      default:
        diceIcon = "dice-1";

        break;
    }
    return diceIcon;
  };

  //makes a new preSet
  const MakePreSet = () => {
    var time = new Date();
    let checkName = name;
    let checkBuffplus = false;
    let diceCheck = selectedDice;

    if (checkName == "") {
      checkName = time.toLocaleString();
    }
    if (buff > 0) {
      checkBuffplus = true;
    }
    if (diceCheck == "") {
      diceCheck = 4;
    }

    let icon = diceIconSelect();

    setPreSet([
      ...preSet,
      {
        id: time.toLocaleTimeString(),
        pDiceNumber: diceNumber,
        pBuff: buff,
        pName: checkName,
        pDice: diceCheck,
        pBuffplus: checkBuffplus,
        pIconName: icon,
      },
    ]);
    setName("");
  };

  //sets newPreSet to false so the modal closes and then calls makePreSet
  const create = () => {
    setNewPreSet(false);
    MakePreSet();
  };

  //saves the canges that has been made to a preSet
  const saveUpdate = () => {
    let icon = diceIconSelect();
    let checkName = name;
    if (checkName == "") {
      checkName = preSet[updateId].pName;
    }
    let checkBuffplus = false;
    if (buff > 0) {
      checkBuffplus = true;
    }
    preSet[updateId].pName = checkName;
    preSet[updateId].pBuff = buff;
    preSet[updateId].pDiceNumber = diceNumber;
    preSet[updateId].pBuffplus = checkBuffplus;
    preSet[updateId].pDice = selectedDice;
    preSet[updateId].pIconName = icon;
    updatePersetSave();
    setUpdateId(0);
    setUpdateModal(false);
  };

  // updates dice if value if not 0
  const updateDiceChange = (val) => {
    if (val != 0) {
      setSelectedDice(val);
    }
  };

  // findes the posison of the preSet you want to find using the id
  const update = (id) => {
    let objIndex = preSet.findIndex((obj) => obj.id == id);
    setUpdateId(objIndex);
    setDiceNumber(preSet[objIndex].pDiceNumber);
    setSelectedDice(preSet[objIndex].pDice);
    setBuff(preSet[objIndex].pBuff);
    //opens the modal
    setUpdateModal(true);
  };

  // delete a preSet using its id
  const deletePreSet = (id) => {
    setPreSet(preSet.filter((item) => item.id !== id));
  };

  // alert for when you want to empty the preSet array
  const deleteAllPresets = () => {
    Alert.alert("Delete", `do you want to delete ALL PRESETS`, [
      {
        text: "Cancel",
      },
      { text: "yes", onPress: () => setPreSet([]) },
    ]);
  };

  // alert for when you want to delete one preSet
  const deleteAlert = (id) => {
    let objIndex = preSet.findIndex((obj) => obj.id == id);
    Alert.alert("Delete", `do you want to delete ${preSet[objIndex].pName}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "yes", onPress: () => deletePreSet(id) },
    ]);
  };

  useEffect(() => {
    if (rollPreSetModal == true) {
      let time = new Date();

      setHistory([
        ...history,
        {
          createdAt: time.toLocaleTimeString(),
          key: time.getMilliseconds(),
          hNumberOfDice: rollArray[0].diceNumber,
          hDice: rollArray[0].dice,
          hRolled: rollArray[0].rollArray,
          hBuff: rollArray[0].buff,
          hPlusEmAll: rollArray[0].resoult,
        },
      ]);
    }
  }, [rollPreSetModal]);
  const rollPreSet = (id) => {
    var time = new Date();
    let lIndex = preSet.findIndex((obj) => obj.id == id);
    let plus = 0;
    setIndex(lIndex);

    let roll = [];
    for (let i = 0; i < preSet[lIndex].pDiceNumber; i++) {
      roll.push({
        key: i,
        item: Math.floor(Math.random() * preSet[lIndex].pDice) + 1,
      });
    }
    {
      roll.map((data) => {
        plus += data.item;
      });
    }

    setRollArray([
      {
        id: time.getMilliseconds(),
        dice: preSet[lIndex].pDice,
        diceNumber: preSet[lIndex].pDiceNumber,
        buff: preSet[lIndex].pBuff,
        rollArray: roll,
        resoult: (plus += preSet[lIndex].pBuff),
      },
    ]);

    setRollPreSetModal(true);
  };
  const CloseRollModal = () => {
    setRollPreSetModal(false);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal isVisible={newPreSet} coverScreen={false} style={{ flex: 1 }}>
        <View style={Style.lightBackground}>
          <TextInput
            keyboardType='default'
            style={[Style.input]}
            placeholder='enter a name'
            placeholderTextColor='white'
            maxLength={30}
            onChangeText={(val) => setName(val)}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 20,
              borderWidth: 1,
              borderColor: "#A9CEC2",
            }}>
            <Picker
              selectedValue={selectedDice}
              style={{ color: "white", margin: 10 }}
              onValueChange={(itemValue, itemIndex) =>
                updateDiceChange(itemValue)
              }>
              <Picker.Item color={color} label='chose a dice' value='0' />
              {dice.map((data) => {
                return (
                  <Picker.Item
                    color={color}
                    label={`${data.sides}d`}
                    value={data.sides}
                    key={data.id}
                  />
                );
              })}
            </Picker>
          </View>

          <View style={styles.DiceNBuffContainer}>
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

            <View style={styles.diceNBuff}>
              <Text
                style={[
                  Style.textColor,
                  Style.DefaultFont,
                  { textAlign: "center" },
                ]}>
                {diceNumber}d
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (diceNumber != 100) {
                  setDiceNumber((diceNumber) => diceNumber + 1);
                }
              }}
              onLongPress={() => {
                setDiceNumber(100);
              }}>
              <AntDesign name='pluscircle' size={30} color='white' />
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }}></View>

          <View style={styles.DiceNBuffContainer}>
            <TouchableOpacity
              onPress={() => setBuff((buff) => buff - 1)}
              onLongPress={() => {
                setBuff(0);
              }}>
              <AntDesign name='minuscircle' size={30} color='white' />
            </TouchableOpacity>

            <View style={styles.diceNBuff}>
              <Text
                style={[
                  Style.DefaultFont,
                  Style.textColor,
                  { textAlign: "center" },
                ]}>
                {buff}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setBuff((buff) => buff + 1)}
              onLongPress={() => {
                setBuff(100);
              }}>
              <AntDesign name='pluscircle' size={30} color='white' />
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }}></View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => setNewPreSet(false)}>
              <Text style={[Style.buttonStyle]}>close</Text>
            </TouchableOpacity>

            <View style={{ flexBasis: "10%" }}></View>

            <TouchableOpacity
              onPress={() => create()}
              style={{ flexBasis: "45%" }}>
              <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* update modal */}
      {updateModal ? (
        <Modal isVisible={updateModal} coverScreen={false} style={{ flex: 1 }}>
          <View style={Style.lightBackground}>
            <TextInput
              keyboardType='default'
              style={[Style.input]}
              placeholder={preSet[updateId].pName}
              placeholderTextColor='white'
              maxLength={30}
              onChangeText={(val) => setName(val)}
            />

            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 20,
                borderWidth: 1,
                borderColor: "#A9CEC2",
              }}>
              <Picker
                selectedValue={selectedDice}
                style={{ color: "white", margin: 10 }}
                onValueChange={(itemValue, itemIndex) =>
                  updateDiceChange(itemValue)
                }>
                <Picker.Item color={color} label='chose a dice' value='0' />
                {dice.map((data) => {
                  return (
                    <Picker.Item
                      color={color}
                      label={`${data.sides}d`}
                      value={data.sides}
                      key={data.id}
                    />
                  );
                })}
              </Picker>
            </View>

            <View style={styles.DiceNBuffContainer}>
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

              <View style={styles.diceNBuff}>
                <Text
                  style={[
                    Style.DefaultFont,
                    Style.textColor,
                    { textAlign: "center" },
                  ]}>
                  {diceNumber}d
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (diceNumber != 100) {
                    setDiceNumber((diceNumber) => diceNumber + 1);
                  }
                }}
                onLongPress={() => {
                  setDiceNumber(100);
                }}>
                <AntDesign name='pluscircle' size={30} color='white' />
              </TouchableOpacity>
            </View>

            <View style={{ height: 40 }}></View>
            <View style={styles.DiceNBuffContainer}>
              <TouchableOpacity
                onPress={() => setBuff((buff) => buff - 1)}
                onLongPress={() => {
                  setBuff(0);
                }}>
                <AntDesign name='minuscircle' size={30} color='white' />
              </TouchableOpacity>

              <View style={styles.diceNBuff}>
                <Text
                  style={[
                    Style.DefaultFont,
                    Style.textColor,
                    { textAlign: "center" },
                  ]}>
                  {buff}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setBuff((buff) => buff + 1)}
                onLongPress={() => {
                  setBuff(100);
                }}>
                <AntDesign name='pluscircle' size={30} color='white' />
              </TouchableOpacity>
            </View>
            <View style={{ height: 20 }}></View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flexBasis: "45%" }}
                onPress={() => setUpdateModal(false)}>
                <Text style={[Style.buttonStyle]}>close</Text>
              </TouchableOpacity>

              <View style={{ flexBasis: "10%" }}></View>

              <TouchableOpacity
                onPress={() => saveUpdate()}
                style={{ flexBasis: "45%" }}>
                <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                  update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : (
        <></>
      )}

      {rollPreSetModal ? (
        <Modal
          isVisible={rollPreSetModal}
          coverScreen={false}
          style={{ flex: 1 }}>
          <View style={[Style.lightBackground]}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={[
                  Style.textColor,
                  Style.DefaultFont,
                  { marginBottom: 5 },
                ]}>
                {rollArray[0].diceNumber}d{rollArray[0].dice}
                {rollArray[0].buff ? (
                  <>
                    {rollArray[0].buff > 0 ? (
                      <>+{rollArray[0].buff}</>
                    ) : (
                      <>{rollArray[0].buff}</>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </Text>
              <Text
                style={[Style.textColor, { fontSize: 25, marginBottom: 5 }]}>
                {rollArray[0].resoult}
              </Text>
              <Text
                style={[
                  Style.textColor,
                  Style.DefaultFont,
                  { marginBottom: 10 },
                ]}>
                {rollArray[0].rollArray.map((data) => {
                  return (
                    <Text key={data.key} style={[Style.textColor]}>
                      {rollArray[0].rollArray.length == 1 ? (
                        <>{data.item}</>
                      ) : (
                        <>{data.item},</>
                      )}
                    </Text>
                  );
                })}
              </Text>
            </View>
            <TouchableOpacity onPress={() => CloseRollModal()}>
              <Text style={[Style.buttonStyle]}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : (
        <></>
      )}

      <View style={{ alignItems: "center" }}>
        <Text style={[Style.textColor, { fontSize: 25 }]}>
          Create pre set rolles here
        </Text>
        <TouchableOpacity onPress={() => setNewPreSet(true)}>
          <MaterialCommunityIcons name='folder-plus' size={30} color='white' />
        </TouchableOpacity>
      </View>

      {preSet.length > 0 ? (
        <ScrollView style={[Style.screenBackground, { flex: 1 }]}>
          {preSet.map((item) => {
            return (
              <View
                key={item.id}
                style={{
                  width: "100%",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "gray",
                  padding: 10,
                  marginVertical: 10,
                  flex: 1,
                }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View
                    style={[
                      styles.diceContainer,
                      Style.lightBackground,
                      { alignSelf: "center" },
                    ]}>
                    <MaterialCommunityIcons
                      name={item.pIconName}
                      size={50}
                      color='black'
                      style={{ textAlign: "center", color: "white" }}
                    />
                  </View>

                  <View
                    style={{
                      paddingLeft: 5,
                      justifyContent: "space-around",
                      flex: 1,
                    }}>
                    <Text style={[Style.textColor, Style.DefaultFont]}>
                      {item.pDiceNumber}d{item.pDice}
                      {item.pBuff ? (
                        <>
                          {item.pBuffplus ? (
                            <>+{item.pBuff}</>
                          ) : (
                            <>{item.pBuff}</>
                          )}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                    </Text>
                    <TouchableOpacity
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => rollPreSet(item.id)}>
                      <Text style={styles.buttonStyle}>roll</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 1, alignSelf: "center" }}>
                    <Text
                      style={[
                        Style.DefaultFont,
                        Style.textColor,
                        {
                          marginBottom: 5,
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                      ]}>
                      {item.pName}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <TouchableOpacity onPress={() => deleteAlert(item.id)}>
                        <MaterialIcons name='delete' size={40} color='red' />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => update(item.id)}>
                        <MaterialCommunityIcons
                          name='content-save-edit'
                          size={40}
                          color='white'
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
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

      <TouchableOpacity
        onPress={() => deleteAllPresets()}
        style={{ alignSelf: "flex-end" }}>
        <Text
          style={[
            Style.buttonStyle,
            { backgroundColor: "red", fontSize: 15, padding: 5 },
          ]}>
          DELETE ALL PRESETS
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  diceNBuff: {
    borderWidth: 1,
    height: 30,
    width: 200,
    justifyContent: "center",
  },
  DiceNBuffContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  diceContainer: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
});
