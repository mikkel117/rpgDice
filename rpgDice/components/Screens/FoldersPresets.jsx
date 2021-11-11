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
import FoldersHistoryRoll from "../functions/FoldersHistoryRoll";

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
  const { setFoldersModal } = useContext(HistoryContext);

  const [color, setColor] = useState("white");

  const [folderIndex, setFolderIndex] = useState(0);
  const [updateModal, setUpdateModal] = useState(false);

  const [newPreset, setNewPreset] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetNamePlaceholder, setPresetNamePlaceholder] =
    useState("Enter a name");
  const [presetIndex, setPresetIndex] = useState();

  /* const [selectedDice, setSelectedDice] = useState(0); */
  const [currentDice, setCurrentDice] = useState(0);
  /* const [diceNumber, setDiceNumber] = useState(1); */
  const [diceCount, setDiceCount] = useState(1);
  /*  const [buff, setBuff] = useState(0); */
  const [diceModifier, setDiceModifier] = useState(0);

  const { id } = route.params;

  useEffect(() => {
    let index = folder.findIndex((obj) => obj.id == id);
    setFolderIndex(index);
    if (Platform.OS == "android") {
      setColor("black");
    }
  }, []);

  const createPreset = () => {
    let time = new Date();
    let name = presetName;
    let pBuffPlus = false;
    let dice = currentDice;
    const old = folder[folderIndex].items;
    if (diceModifier > 0) {
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
        diceCount: diceCount,
        diceModifier: diceModifier,
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
    setCurrentDice(0);
    setDiceCount(1);
    setDiceModifier(0);
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
    setCurrentDice(folder[folderIndex].items[objIndex].dice);
    setDiceCount(folder[folderIndex].items[objIndex].diceCount);
    setDiceModifier(folder[folderIndex].items[objIndex].diceModifier);
    setNewPreset(true);
  };

  const updatePreset = () => {
    if (presetName == "") {
      folder[folderIndex].items[presetIndex].name = presetNamePlaceholder;
    } else {
      folder[folderIndex].items[presetIndex].name = presetName;
    }

    if (diceModifier > 0) {
      folder[folderIndex].items[presetIndex].buffPlus = true;
    } else {
      folder[folderIndex].items[presetIndex].buffPlus = false;
    }

    const icon = DiceIconSelect(currentDice);

    folder[folderIndex].items[presetIndex].icon = icon;
    folder[folderIndex].items[presetIndex].dice = currentDice;
    folder[folderIndex].items[presetIndex].diceCount = diceCount;
    folder[folderIndex].items[presetIndex].diceModifier = diceModifier;
    reset();
    setFolder([...folder]);
    setUpdateModal(false);
    setNewPreset(false);
  };

  const openRollModal = (id) => {
    const objIndex = folder[folderIndex].items.findIndex((obj) => obj.id == id);
    setDiceCount(folder[folderIndex].items[objIndex].diceCount);
    setCurrentDice(folder[folderIndex].items[objIndex].dice);
    setDiceModifier(folder[folderIndex].items[objIndex].diceModifier);
    setFoldersModal(true);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      {FoldersHistoryRoll(diceCount, currentDice, diceModifier)}
      <Modal
        isVisible={newPreset}
        coverScreen={true}
        style={{ margin: 0, flex: 1 }}>
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
              selectedValue={currentDice}
              style={{ color: "white", margin: 10 }}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue != 0) setCurrentDice(itemValue);
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
                if (diceCount != 1) {
                  setDiceCount((diceCount) => diceCount - 1);
                }
              }}
              onLongPress={() => {
                setDiceCount(1);
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
                {diceCount}d
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (diceCount != 100) {
                  setDiceCount((diceCount) => diceCount + 1);
                }
              }}
              onLongPress={() => {
                setDiceCount(100);
              }}>
              <AntDesign name='pluscircle' size={30} color='white' />
            </TouchableOpacity>
          </View>

          <View style={{ height: 40 }}></View>

          <View style={styles.DiceNBuffContainer}>
            <TouchableOpacity
              onPress={() =>
                setDiceModifier((diceModifier) => diceModifier - 1)
              }
              onLongPress={() => {
                setDiceModifier(0);
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
                {diceModifier}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                setDiceModifier((diceModifier) => diceModifier + 1)
              }
              onLongPress={() => {
                setDiceModifier(100);
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

      {/* back */}
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
        <>
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
                        {data.diceCount}d{data.dice}
                        {data.diceModifier ? (
                          <>
                            {data.buffPlus ? (
                              <>+{data.diceModifier}</>
                            ) : (
                              <>{data.diceModifier}</>
                            )}
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

                      <TouchableOpacity
                        onPress={() => openUpdateModal(data.id)}>
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
        </>
      ) : (
        <View
          style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
          <Text style={[Style.textColor, Style.DefaultFont]}>Empty</Text>
        </View>
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
});
