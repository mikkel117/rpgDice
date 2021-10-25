import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import Style from "../../assets/styles/styles";
import { DiceContext } from "../context/DiceContext";
import { HistoryContext } from "../context/HistoryContext";
import { FolderContext } from "../context/FolderContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function FoldersPresets({ route, navigation }) {
  const { dice } = useContext(DiceContext);
  const { folder, setFolder } = useContext(FolderContext);
  const { history, setHistory } = useContext(HistoryContext);

  const [color, setColor] = useState("white");

  const [folderIndex, setFolderIndex] = useState(0);

  const [newPreset, setNewPreset] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [selectedDice, setSelectedDice] = useState(0);
  const [diceNumber, setDiceNumber] = useState(1);
  const [buff, setBuff] = useState(0);

  const { id } = route.params;

  useEffect(() => {
    if (Platform.OS == "android") {
      setColor("black");
    }
  }, []);

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

  useEffect(() => {
    let index = folder.findIndex((obj) => obj.id == id);
    setFolderIndex(index);
  }, []);

  const createPreset = () => {
    let time = new Date();
    let name = presetName;
    let pBuffPlus = false;
    let dice = selectedDice;
    const old = folder[folderIndex].items;
    // time.toLocaleString();
    if (buff > 0) {
      pBuffPlus = true;
    }
    if (dice == "") {
      dice = 4;
    }
    if (name == "") {
      name = time.toLocaleString();
    }

    let icon = diceIconSelect();

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
    setPresetName("");
    setNewPreset(false);
  };

  return (
    <View style={[Style.screenBackground, { flex: 1 }]}>
      <Modal
        isVisible={newPreset}
        coverScreen={true}
        style={{ margin: 0, flex: 1 }}>
        <View style={[Style.lightBackground, {}]}>
          <TextInput
            keyboardType='default'
            style={[Style.input, Style.DefaultFont]}
            placeholder={`enter a name`}
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
              onPress={() => setNewPreset(false)}>
              <Text style={[Style.buttonStyle]}>close</Text>
            </TouchableOpacity>
            <View style={{ flexBasis: "10%" }}></View>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => createPreset()}>
              <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => navigation.navigate("folders")}>
        <Text style={[Style.buttonStyle]}>go back to folders</Text>
      </TouchableOpacity>

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => setNewPreset(true)}>
          <MaterialIcons name='create-new-folder' size={30} color='white' />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={[Style.DefaultFont, Style.textColor]}>
          {folder[folderIndex].name}
        </Text>
      </View>

      {folder[folderIndex].items.length > 0 ? (
        <ScrollView>
          {folder[folderIndex].items.map((data) => {
            return (
              <View
                key={data.id}
                style={{
                  width: "100%",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "gray",
                  padding: 10,
                  marginVertical: 10,
                  flex: 1,
                }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <View
                      style={[
                        styles.diceContainer,
                        Style.lightBackground,
                        /* { alignSelf: "center" }, */
                      ]}>
                      <MaterialCommunityIcons
                        name={data.icon}
                        size={50}
                        color='black'
                        style={{ textAlign: "center", color: "white" }}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        marginLeft: 10,
                      }}>
                      <Text style={[Style.textColor, Style.DefaultFont]}>
                        {data.numberOfDice}d{data.dice}
                        {data.buff ? (
                          <>
                            {data.buffPlus ? (
                              <>+{data.buff}</>
                            ) : (
                              <>{data.buff}</>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </Text>

                      <TouchableOpacity>
                        <Text style={[styles.buttonStyle]}>roll</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
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
                      {data.name}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}>
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
