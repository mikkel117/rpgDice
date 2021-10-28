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
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import DiceIconSelect from "../functions/DiceIconSelect";
import PresetStyle from "../../assets/styles/PresetStyle";
import Style from "../../assets/styles/styles";
import { DiceContext } from "../context/DiceContext";
import { HistoryContext } from "../context/HistoryContext";

export default function Presets({ navigation }) {
  const { dice } = useContext(DiceContext);
  const { history, setHistory } = useContext(HistoryContext);

  /******************************************************* */
  //update Preset
  const [diceInputPlaceholder, setDiceInputPlaceholder] =
    useState("enter a name");
  const [updateModal, setUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  /******************************************************* */

  /******************************************************* */
  //never reset this unless you delete all presets
  const [preset, setPreset] = useState([]);
  /******************************************************* */

  const [newPreset, setNewPreset] = useState(false);
  const [diceNumber, setDiceNumber] = useState(1);
  const [buff, setBuff] = useState(0);

  const [name, setName] = useState("");

  const [color, setColor] = useState("white");

  const [selectedDice, setSelectedDice] = useState(0);

  const [rollPresetModal, setRollPresetModal] = useState(false);
  const [rollArray, setRollArray] = useState([]);

  //checks the platform and if it is android it will set color to black
  //it will also call read
  useEffect(() => {
    if (Platform.OS == "android") {
      setColor("black");
    }
    read();
  }, []);
  //call updatePresetSave every time Preset is change
  useEffect(() => {
    updatePersetSave();
  }, [preset]);

  const reset = () => {
    setDiceInputPlaceholder("enter a name");
    setDiceNumber(1);
    setBuff(0);
    setSelectedDice(0);
    setName("");
    setUpdateModal(false);
    setUpdateId(0);
  };

  //search the save file for the key Presets and if it is not empty setPreset to what it finds
  const read = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("presets");
      let jsonData = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (jsonData != null) {
        setPreset(jsonData);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  //updates the save file with Preset
  const updatePersetSave = async () => {
    try {
      const jsonValue = JSON.stringify(preset);
      await AsyncStorage.setItem("presets", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  //makes a new Preset
  const MakePreset = () => {
    const time = new Date();
    let checkName = name;
    let checkBuffplus = false;
    let diceCheck = selectedDice;

    if (checkName == "") {
      checkName = time.toLocaleString();
    }
    if (buff > 0) {
      checkBuffplus = true;
    }
    if (selectedDice == "") {
      diceCheck = 4;
    }

    let icon = DiceIconSelect(diceCheck);

    setPreset([
      ...preset,
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
    reset();
  };

  //sets newPreset to false so the modal closes and then calls makePreset
  const create = () => {
    setNewPreset(false);
    MakePreset();
  };

  //saves the canges that has been made to a Preset
  const saveUpdate = () => {
    let icon = DiceIconSelect(selectedDice);
    let checkName = name;
    if (checkName == "") {
      checkName = preset[updateId].pName;
    }
    let checkBuffplus = false;
    if (buff > 0) {
      checkBuffplus = true;
    }
    preset[updateId].pName = checkName;
    preset[updateId].pBuff = buff;
    preset[updateId].pDiceNumber = diceNumber;
    preset[updateId].pBuffplus = checkBuffplus;
    preset[updateId].pDice = selectedDice;
    preset[updateId].pIconName = icon;
    updatePersetSave();
    setNewPreset(false);
    reset();
  };

  // updates dice if value if not 0
  const updateDiceChange = (val) => {
    if (val != 0) {
      setSelectedDice(val);
    }
  };

  // findes the posison of the Preset you want to find using the id
  const update = (id) => {
    let objIndex = preset.findIndex((obj) => obj.id == id);
    setUpdateId(objIndex);
    setDiceNumber(preset[objIndex].pDiceNumber);
    setSelectedDice(preset[objIndex].pDice);
    setBuff(preset[objIndex].pBuff);
    setName(preset[objIndex].pName);
    setDiceInputPlaceholder(preset[objIndex].pName);
    //opens the modal
    setNewPreset(true);
    setUpdateModal(true);
  };

  // delete a preSet using its id
  const deletePreset = (id) => {
    setPreset(preset.filter((item) => item.id !== id));
  };

  // alert for when you want to empty the preSet array
  const deleteAllPresets = () => {
    Alert.alert("Delete", `do you want to delete ALL PRESETS`, [
      {
        text: "Cancel",
      },
      { text: "yes", onPress: () => setPreset([]) },
    ]);
  };

  // alert for when you want to delete one preSet
  const deleteAlert = (id) => {
    let objIndex = preset.findIndex((obj) => obj.id == id);
    Alert.alert("Delete", `do you want to delete ${preset[objIndex].pName}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "yes", onPress: () => deletePreset(id) },
    ]);
  };

  useEffect(() => {
    if (rollPresetModal == true) {
      let time = new Date();

      setHistory([
        ...history,
        {
          createdAt: time.toLocaleTimeString(),
          key: time.toLocaleTimeString(),
          hNumberOfDice: rollArray[0].diceNumber,
          hDice: rollArray[0].dice,
          hRolled: rollArray[0].rollArray,
          hBuff: rollArray[0].buff,
          hPlusEmAll: rollArray[0].resoult,
        },
      ]);
    }
  }, [rollPresetModal]);

  const rollPreset = (id) => {
    var time = new Date();
    let pIndex = preset.findIndex((obj) => obj.id == id);
    let plus = 0;

    let roll = [];
    for (let i = 0; i < preset[pIndex].pDiceNumber; i++) {
      roll.push({
        key: i,
        item: Math.floor(Math.random() * preset[pIndex].pDice) + 1,
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
        dice: preset[pIndex].pDice,
        diceNumber: preset[pIndex].pDiceNumber,
        buff: preset[pIndex].pBuff,
        rollArray: roll,
        resoult: (plus += preset[pIndex].pBuff),
      },
    ]);

    setRollPresetModal(true);
  };
  const CloseRollModal = () => {
    setRollPresetModal(false);
    reset();
  };

  const closeModal = () => {
    setNewPreset(false);
    reset();
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal isVisible={newPreset} style={{ margin: 0 }}>
        <View style={Style.lightBackground}>
          <TextInput
            keyboardType='default'
            style={[Style.input]}
            placeholder={`${diceInputPlaceholder}`}
            placeholderTextColor='white'
            maxLength={30}
            onChangeText={(val) => {
              if (val != "") {
                setName(val);
              }
            }}
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
              onPress={() => closeModal()}>
              <Text style={[Style.buttonStyle]}>close</Text>
            </TouchableOpacity>

            <View style={{ flexBasis: "10%" }}></View>

            {updateModal ? (
              <TouchableOpacity
                onPress={() => saveUpdate()}
                style={{ flexBasis: "45%" }}>
                <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                  update
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => create()}
                style={{ flexBasis: "45%" }}>
                <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                  create
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* update modal */}
      {updateModal ? (
        <Modal isVisible={false} coverScreen={false} style={{ flex: 1 }}>
          <View style={Style.lightBackground}>
            <TextInput
              keyboardType='default'
              style={[Style.input]}
              placeholder={preset[updateId].pName}
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

      {rollPresetModal ? (
        <Modal isVisible={rollPresetModal} style={{ margin: 0 }}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center" }}
            onPress={() => CloseRollModal()}>
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
            </View>
          </TouchableOpacity>
        </Modal>
      ) : (
        <></>
      )}

      <View style={{ alignItems: "center" }}>
        <Text style={[Style.textColor, { fontSize: 25 }]}>
          Create pre set rolles here
        </Text>
        <TouchableOpacity onPress={() => setNewPreset(true)}>
          <MaterialCommunityIcons name='folder-plus' size={30} color='white' />
        </TouchableOpacity>
      </View>

      {preset.length > 0 ? (
        <>
          <ScrollView style={[Style.screenBackground, { flex: 1 }]}>
            {preset.map((data) => {
              return (
                <View style={[PresetStyle.presetContainer, {}]} key={data.id}>
                  <View style={PresetStyle.diceButtonContainer}>
                    <TouchableOpacity onPress={() => rollPreset(data.id)}>
                      <View style={[PresetStyle.diceContainer]}>
                        <MaterialCommunityIcons
                          name={data.pIconName}
                          size={50}
                          color='white'
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={[PresetStyle.buttonContainer]}>
                      <Text style={[PresetStyle.buttonText]}>
                        {data.pDiceNumber}d{data.pDice}
                        {data.pBuff ? (
                          <>
                            {data.pBuffplus ? (
                              <>+{data.pBuff}</>
                            ) : (
                              <>{data.pBuff}</>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={[PresetStyle.deleteEditcontainer]}>
                    <Text style={[PresetStyle.name]}>{data.pName}</Text>
                    <View style={[PresetStyle.deleteEditWrapper]}>
                      <TouchableOpacity onPress={() => deleteAlert(data.id)}>
                        <MaterialIcons name='delete' size={40} color='red' />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => update(data.id)}>
                        <MaterialCommunityIcons
                          name='content-save-edit'
                          size={40}
                          color='white'
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
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
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={[Style.DefaultFont, Style.textColor]}>Empty</Text>
        </View>
      )}
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

{
}
