import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import Style from "../../assets/styles/styles";
import PresetStyle from "../../assets/styles/PresetStyle";
import DiceIconSelect from "../functions/DiceIconSelect";

import { DiceContext } from "../context/DiceContext";
import { HistoryContext } from "../context/HistoryContext";
import { FolderContext } from "../context/FolderContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function FoldersPresets({ route, navigation }) {
  const { dice } = useContext(DiceContext);
  const { folder, setFolder } = useContext(FolderContext);
  const { history, setHistory } = useContext(HistoryContext);

  const [color, setColor] = useState("white");

  const [folderIndex, setFolderIndex] = useState(0);
  const [updateModal, setUpdateModal] = useState(false);

  const [newPreset, setNewPreset] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetNamePlaceholder, setPresetNamePlaceholder] =
    useState("Enter a name");
  const [selectedDice, setSelectedDice] = useState(0);
  const [diceNumber, setDiceNumber] = useState(1);
  const [buff, setBuff] = useState(0);
  const [buffPlus, setBuffPlus] = useState(false);
  const [presetIndex, setPresetIndex] = useState();

  const [rollModal, setRollModal] = useState();
  const [rollArray, setRollArray] = useState([]);
  const [resoult, setResoult] = useState(0);

  const { id } = route.params;

  useEffect(() => {
    let index = folder.findIndex((obj) => obj.id == id);
    setFolderIndex(index);
    if (Platform.OS == "android") {
      setColor("black");
    }
  }, []);

  useEffect(() => {
    //if rolled is now 0 then do this
    if (rollArray != 0) {
      let Plus = 0;
      rollArray.map((data) => {
        Plus += data.item;
      });
      Plus += buff;
      setResoult(Plus);
      History(Plus);
    }
    //ever time rolled is updated
  }, [rollArray]);

  const createPreset = () => {
    let time = new Date();
    let name = presetName;
    let pBuffPlus = false;
    let dice = selectedDice;
    const old = folder[folderIndex].items;
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

    const updated = [
      ...old,
      {
        id: time.toLocaleTimeString(),
        numberOfDice: diceNumber,
        buff: buff,
        name: name,
        dice: dice,
        buffPlus: pBuffPlus,
        icon: icon,
      },
    ];
    const clone = [...folder];
    clone[folderIndex].items = updated;
    setFolder(clone);
    reset();
    setNewPreset(false);
  };

  const closeModal = () => {
    reset();
    setNewPreset(false);
  };

  const reset = () => {
    setPresetNamePlaceholder("enter a name");
    setSelectedDice(0);
    setDiceNumber(1);
    setBuff(0);
    setPresetIndex();
  };

  const deletePreset = (id) => {
    const filter = folder[folderIndex].items.filter((items) => items.id != id);
    const clone = [...folder];
    clone[folderIndex].items = filter;
    setFolder(clone);
  };

  const deleteOneAlert = (id) => {
    let objIndex = folder[folderIndex].items.findIndex((obj) => obj.id == id);
    Alert.alert(
      "Delete",
      `do you want to delete ${folder[folderIndex].items[objIndex].name}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "yes", onPress: () => deletePreset(id) },
      ]
    );
  };

  const deleteAllPresets = () => {
    folder[folderIndex].items = [];
    setFolder([...folder]);
  };

  const deleteAllAlert = () => {
    Alert.alert(
      "Delete",
      `do you want to all delete presets in "${folder[folderIndex].name}" folder`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "yes", onPress: () => deleteAllPresets() },
      ]
    );
  };

  const openUpdateModal = (id) => {
    const objIndex = folder[folderIndex].items.findIndex((obj) => obj.id == id);
    setPresetIndex(objIndex);
    setUpdateModal(true);
    setPresetNamePlaceholder(folder[folderIndex].items[objIndex].name);
    setSelectedDice(folder[folderIndex].items[objIndex].dice);
    setDiceNumber(folder[folderIndex].items[objIndex].numberOfDice);
    setBuff(folder[folderIndex].items[objIndex].buff);
    setNewPreset(true);
  };

  const updatePreset = () => {
    if (presetName == "") {
      folder[folderIndex].items[presetIndex].name = presetNamePlaceholder;
    } else {
      folder[folderIndex].items[presetIndex].name = presetName;
    }

    if (buff > 0) {
      folder[folderIndex].items[presetIndex].buffPlus = true;
    } else {
      folder[folderIndex].items[presetIndex].buffPlus = false;
    }

    const icon = DiceIconSelect(selectedDice);

    folder[folderIndex].items[presetIndex].icon = icon;
    folder[folderIndex].items[presetIndex].dice = selectedDice;
    folder[folderIndex].items[presetIndex].numberOfDice = diceNumber;
    folder[folderIndex].items[presetIndex].buff = buff;
    reset();
    setFolder([...folder]);
    setUpdateModal(false);
    setNewPreset(false);
  };

  const openRollModal = (id) => {
    const objIndex = folder[folderIndex].items.findIndex((obj) => obj.id == id);
    const numberOfDice = folder[folderIndex].items[objIndex].numberOfDice;
    const diceNumber = folder[folderIndex].items[objIndex].dice;
    setDiceNumber(numberOfDice);
    setSelectedDice(diceNumber);
    setBuff(folder[folderIndex].items[objIndex].buff);
    setBuffPlus(folder[folderIndex].items[objIndex].buffPlus);
    let diceSides = numberOfDice;
    let pushArray = [];
    for (let i = 0; i < diceSides; i++) {
      pushArray.push({
        key: i,
        item: Math.floor(Math.random() * diceNumber) + 1,
      });
    }
    setRollArray(pushArray);

    pushArray = [];
    setNewPreset(true);
    setRollModal(true);
  };
  const closeRollModal = () => {
    setNewPreset(false);
    reset();
    setTimeout(() => setRollModal(false), 300);
  };

  const History = (Plus) => {
    let time = new Date();

    setHistory([
      ...history,
      {
        createdAt: time.toLocaleTimeString(),
        key: time.getMilliseconds(),
        hNumberOfDice: diceNumber,
        hDice: selectedDice,
        hRolled: rollArray,
        hBuff: buff,
        hPlusEmAll: Plus,
      },
    ]);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal
        isVisible={newPreset}
        coverScreen={true}
        style={{ margin: 0, flex: 1 }}>
        {rollModal ? (
          <TouchableOpacity
            onPress={() => closeRollModal()}
            style={{ flex: 1, justifyContent: "center" }}>
            <View style={[Style.lightBackground]}>
              <Text
                style={[
                  Style.textColor,
                  Style.DefaultFont,
                  { textAlign: "center", paddingBottom: 5 },
                ]}>
                {diceNumber}d{selectedDice}
                {buff ? <>{buffPlus ? <>+{buff}</> : <>{buff}</>} </> : <></>}
              </Text>
              <Text
                style={[
                  Style.textColor,
                  { textAlign: "center", fontSize: 25, paddingBottom: 5 },
                ]}>
                {resoult}
              </Text>
              <Text
                style={[
                  Style.textColor,
                  Style.DefaultFont,
                  { textAlign: "center", paddingBottom: 5 },
                ]}>
                {rollArray.map((data) => {
                  return (
                    <Text key={data.key}>
                      {rollArray.length == 1 ? (
                        <>{data.item}</>
                      ) : (
                        <>{data.item},</>
                      )}
                    </Text>
                  );
                })}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={[Style.lightBackground, {}]}>
            <TextInput
              keyboardType='default'
              style={[Style.input, Style.DefaultFont]}
              placeholder={`${presetNamePlaceholder}`}
              placeholderTextColor='white'
              maxLength={30}
              onChangeText={(val) => {
                if (val != 0) setPresetName(val);
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
                  style={{ flexBasis: "45%" }}
                  onPress={() => updatePreset()}>
                  <Text
                    style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                    update
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ flexBasis: "45%" }}
                  onPress={() => createPreset()}>
                  <Text
                    style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                    create
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </Modal>

      <TouchableOpacity
        onPress={() => navigation.navigate("folders")}
        style={{ alignSelf: "flex-start" }}>
        <Entypo name='back' size={40} color='white' />
      </TouchableOpacity>

      <View style={{ alignItems: "center" }}>
        <Text style={[Style.textColor, { fontSize: 25, fontWeight: "bold" }]}>
          {folder[folderIndex].name}
        </Text>

        <TouchableOpacity onPress={() => setNewPreset(true)}>
          <MaterialIcons
            name='create-new-folder'
            size={35}
            color='white'
            style={{ marginTop: 10 }}
          />
        </TouchableOpacity>
      </View>

      {folder[folderIndex].items.length > 0 ? (
        <ScrollView>
          {folder[folderIndex].items.map((data) => {
            return (
              <View style={[PresetStyle.presetContainer, {}]} key={data.id}>
                <View style={PresetStyle.diceButtonContainer}>
                  <TouchableOpacity onPress={() => openRollModal(data.id)}>
                    <View style={[PresetStyle.diceContainer]}>
                      <MaterialCommunityIcons
                        name={data.icon}
                        size={50}
                        color='white'
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={[PresetStyle.buttonContainer]}>
                    <Text style={[PresetStyle.buttonText]}>
                      {data.numberOfDice}d{data.dice}
                      {data.buff ? (
                        <>
                          {data.buffPlus ? <>+{data.buff}</> : <>{data.buff}</>}
                        </>
                      ) : (
                        <></>
                      )}
                    </Text>
                  </View>
                </View>
                <View style={[PresetStyle.deleteEditcontainer]}>
                  <Text style={[PresetStyle.name]}>{data.name}</Text>
                  <View style={[PresetStyle.deleteEditWrapper]}>
                    <TouchableOpacity onPress={() => deleteOneAlert(data.id)}>
                      <MaterialIcons name='delete' size={40} color='red' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => openUpdateModal(data.id)}>
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
      ) : (
        <View
          style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
          <Text style={[Style.textColor, Style.DefaultFont]}>Empty</Text>
        </View>
      )}

      {folder[folderIndex].items.length > 0 ? (
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => deleteAllAlert()}>
          <Text
            style={[
              Style.buttonStyle,
              { backgroundColor: "red", fontSize: 15, padding: 5 },
            ]}>
            DELETE ALL PRESETS
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  DiceNBuffContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  diceNBuff: {
    borderWidth: 1,
    height: 30,
    width: 200,
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
