import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { SettingsContext } from "../context/SettingsContext";

export default function Folders() {
  const { firstTime, setFirstTime, preSetDefoult, setPreSetDefoult } =
    useContext(SettingsContext);
  const [folder, setFolder] = useState([
    {
      id: 1,
      name: "Bob the wizard",
      items: [
        { id: 1, name: "Staff attack", numberOfDice: 1, dice: 20, buff: 3 },
      ],
    },
    {
      id: 2,
      name: "Alex the Rogue",
      items: [
        { id: 1, name: "Dagger attack", numberOfDice: 1, dice: 20, buff: 7 },
      ],
    },
    {
      id: 3,
      name: "Peter the knight",
      items: [
        { id: 1, name: "Sword attack", numberOfDice: 1, dice: 20, buff: 10 },
      ],
    },
  ]);

  //********************************************************** */
  //folder state
  const [Folderindex, setFolderIndex] = useState(0);
  const [showFolder, setShowFolder] = useState(true);
  const [newFolder, setNewFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  /* const [folderClicked, setFolderClicked] = useState(false); */
  //********************************************************** */

  const createUpdateFolder = () => {
    let name = folderName;
    let time = new Date();
    if (name == "") {
      name = time.toLocaleString();
    }
    setNewFolder(false);
    setFolder([
      ...folder,
      {
        id: time.toLocaleString(),
        name: name,
        items: [],
      },
    ]);
  };

  const getIndex = (id) => {
    let index = folder.findIndex((obj) => obj.id == id);
    setFolderIndex(index);
    setShowFolder(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={newFolder}
        coverScreen={true}
        style={{ margin: 0, flex: 1 }}>
        <View style={[Style.lightBackground, {}]}>
          <TextInput
            keyboardType='default'
            style={[Style.input, Style.defoultFont]}
            placeholder='folder name'
            placeholderTextColor='white'
            maxLength={30}
            onChangeText={(val) => {
              if (val != 0) setFolderName(val);
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => setNewFolder(false)}>
              <Text style={[Style.buttonStyle]}>close</Text>
            </TouchableOpacity>
            <View style={{ flexBasis: "10%" }}></View>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => createUpdateFolder()}>
              <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ alignItems: "center" }}>
        {showFolder ? (
          <>
            <TouchableOpacity onPress={() => setNewFolder(true)}>
              <MaterialIcons name='create-new-folder' size={30} color='white' />
            </TouchableOpacity>
            <Text style={[Style.defoultFont, Style.textColor]}>
              create and edit folders here
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => console.log("new preset")}>
              <MaterialIcons name='create-new-folder' size={30} color='white' />
            </TouchableOpacity>
            <Text style={[Style.defoultFont, Style.textColor]}>
              create and edit presets here
            </Text>
          </>
        )}
      </View>
      <View style={{ flex: 1 }}>
        {showFolder ? (
          <ScrollView style={{ flex: 1 }}>
            {folder.map((data) => {
              return (
                <View
                  key={data.id}
                  style={{
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: "gray",
                    padding: 10,
                    marginVertical: 10,
                    flex: 1,
                    flexDirection: "row",
                  }}>
                  <View
                    style={[
                      {
                        flex: 1,
                      },
                    ]}>
                    <TouchableOpacity
                      style={[
                        Style.lightBackground,
                        { height: 70, justifyContent: "center" },
                      ]}
                      onPress={() => getIndex(data.id)}>
                      <Text
                        style={[
                          Style.textColor,
                          Style.defoultFont,
                          { textAlign: "center" },
                        ]}>
                        {data.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}>
                    <TouchableOpacity>
                      <MaterialIcons name='delete' size={40} color='red' />
                    </TouchableOpacity>

                    {/* <View style={{ width: 20 }}></View> */}

                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name='content-save-edit'
                        size={40}
                        color='white'
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <>
            <View
              style={{
                alignItems: "stretch",
                width: "100%",
                marginBottom: 10,
              }}>
              <TouchableOpacity onPress={() => setShowFolder(true)}>
                <Text style={Style.buttonStyle}>go Back</Text>
              </TouchableOpacity>
            </View>
            {folder[Folderindex].items.map((data) => {
              return (
                <View key={data.id}>
                  <Text style={[Style.defoultFont, Style.textColor]}>
                    attack name {data.name}
                  </Text>
                </View>
              );
            })}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
  },
  color: {
    fontSize: 20,
    color: "white",
  },
  diceContainer: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
