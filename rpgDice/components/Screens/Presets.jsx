import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import DiceIconSelect from "../functions/DiceIconSelect";
import PresetStyle from "../../assets/styles/PresetStyle";
import Style from "../../assets/styles/styles";
import FoldersHistoryRoll from "../functions/FoldersHistoryRoll";
import { DiceContext } from "../context/DiceContext";
import { HistoryContext } from "../context/HistoryContext";

export default function Presets({ navigation }) {
  const { dice } = useContext(DiceContext);
  const { setFoldersModal, foldersModal } = useContext(HistoryContext);

  /******************************************************* */
  //update Preset
  const [updateModal, setUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  /******************************************************* */

  /******************************************************* */
  //never reset this unless you delete all presets
  const [preset, setPreset] = useState([]);
  /******************************************************* */

  /******************************************************* */
  //creat presets
  const [color, setColor] = useState("white");
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [selectedDice, setSelectedDice] = useState(0);
  const [buff, setBuff] = useState(0);
  /******************************************************* */
  const [presetName, setPresetName] = useState("");
  const [presetInputPlaceholder, setPresetInputPlaceholder] =
    useState("enter a name");
  const [presetModal, setPresetModal] = useState(false);

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

  useEffect(() => {
    if (foldersModal == false) {
      reset();
    }
  }, [foldersModal]);

  const reset = () => {
    setPresetInputPlaceholder("enter a name");
    setNumberOfDice(1);
    setBuff(0);
    setSelectedDice(0);
    setPresetName("");
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

  const close = () => {
    reset();
    setPresetModal(false);
  };

  const saveUpdate = () => {
    if (presetName == "") {
      updateId.name = presetInputPlaceholder;
    } else {
      updateId.name = presetName;
    }
    if (buff > 0) {
      updateId.buffPlus = true;
    } else {
      updateId.buffPlus = false;
    }

    const icon = DiceIconSelect(selectedDice);
    updateId.icon = icon;
    updateId.dice = selectedDice;
    updateId.buff = buff;
    updateId.numberOfDice = numberOfDice;
    reset();
    setPreset([...preset]);
    setUpdateModal(false);
    setUpdateId(0);
    setPresetModal(false);
  };

  const createPreset = () => {
    let time = new Date();
    let name = presetName;
    let pBuffPlus = false;
    let dice = selectedDice;
    if (buff > 0) {
      pBuffPlus = true;
    }
    if (dice == "") {
      dice = 4;
    }
    if (name == "") {
      name = time.toLocaleString();
    }

    const icon = DiceIconSelect(dice);

    setPreset([
      ...preset,
      {
        id: time.toLocaleTimeString(),
        numberOfDice: numberOfDice,
        buff: buff,
        name: name,
        dice: dice,
        buffPlus: pBuffPlus,
        icon: icon,
      },
    ]);
    reset();
    setPresetModal(false);
  };

  const update = (id) => {
    const index = preset.findIndex((obj) => obj.id == id);
    const presetPath = preset[index];
    setUpdateId(presetPath);
    setBuff(presetPath.buff);
    setSelectedDice(presetPath.dice);
    setPresetName(presetPath.name);
    setPresetInputPlaceholder(presetPath.name);
    setNumberOfDice(presetPath.numberOfDice);
    setPresetModal(true);
    setUpdateModal(true);
  };

  //sets the CurentDice to what is pressed on and then opens the roll modal
  const openRollModal = (id) => {
    let index = preset.findIndex((obj) => obj.id == id);
    setSelectedDice(preset[index].dice);
    setBuff(preset[index].buff);
    setNumberOfDice(preset[index].numberOfDice);
    setFoldersModal(true);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      {FoldersHistoryRoll(numberOfDice, selectedDice, buff)}
      <Modal isVisible={presetModal} style={{ margin: 0 }}>
        <View style={[Style.lightBackground, {}]}>
          <TextInput
            keyboardType='default'
            style={Style.input}
            placeholder={`${presetInputPlaceholder}`}
            maxLength={30}
            placeholderTextColor='white'
            onChangeText={(val) => {
              if (val != "") {
                setPresetName(val);
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
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue != 0) setSelectedDice(itemValue);
              }}>
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
                if (numberOfDice != 1) {
                  setNumberOfDice((numberOfDice) => numberOfDice - 1);
                }
              }}
              onLongPress={() => {
                setNumberOfDice(1);
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
                {numberOfDice}d
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (numberOfDice != 100) {
                  setNumberOfDice((numberOfDice) => numberOfDice + 1);
                }
              }}
              onLongPress={() => {
                setNumberOfDice(100);
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
              onPress={() => close()}>
              <Text style={[Style.buttonStyle]}>close</Text>
            </TouchableOpacity>
            <View style={{ flexBasis: "10%" }}></View>
            {updateModal ? (
              <TouchableOpacity
                style={{ flexBasis: "45%" }}
                onPress={() => saveUpdate()}>
                <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                  update
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ flexBasis: "45%" }}
                onPress={() => createPreset()}>
                <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                  create
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      <View style={{ alignItems: "center" }}>
        <Text style={[Style.textColor, { fontSize: 25 }]}>
          Create pre set rolles here
        </Text>
        <TouchableOpacity onPress={() => setPresetModal(true)}>
          <Ionicons name='create' size={30} color='white' />
        </TouchableOpacity>
      </View>
      {preset.length > 0 ? (
        <>
          <FlatList
            data={preset}
            renderItem={({ item }) => (
              <View style={[PresetStyle.presetContainer, {}]}>
                <View style={PresetStyle.diceButtonContainer}>
                  <TouchableOpacity onPress={() => openRollModal(item.id)}>
                    <View style={[PresetStyle.diceContainer]}>
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={50}
                        color='white'
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={[PresetStyle.buttonContainer]}>
                    <Text style={[PresetStyle.buttonText]}>
                      {item.numberOfDice}d{item.dice}
                      {item.buff ? (
                        <>
                          {item.buffPlus ? <>+{item.buff}</> : <>{item.buff}</>}
                        </>
                      ) : (
                        <></>
                      )}
                    </Text>
                  </View>
                </View>
                <View style={[PresetStyle.deleteEditcontainer]}>
                  <Text style={[PresetStyle.name]}>{item.name}</Text>
                  <View style={[PresetStyle.deleteEditWrapper]}>
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
            )}
            keyExtractor={(item) => item.id.toString()}
          />

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
});
