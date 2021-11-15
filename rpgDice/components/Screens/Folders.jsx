import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import Modal from "react-native-modal";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Style from "../../assets/styles/styles";
import { SettingsContext } from "../context/SettingsContext";
import { FolderContext } from "../context/FolderContext";

export default function Folders({ navigation }) {
  const { folder, setFolder } = useContext(FolderContext);

  //********************************************************** */
  //folder state
  const [Folderindex, setFolderIndex] = useState(0);
  const [folderModal, setFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderUpdatePLaceHolder, setFolderUpdatePLaceHolder] = useState("");
  const [folderUpdate, setFolderUpdate] = useState(false);
  //********************************************************** */

  //********************************************************** */
  //create new, update and delete folder
  const openModal = () => {
    setFolderUpdate(false);
    setFolderModal(true);
  };
  //todo come up with a new name
  const createFolder = () => {
    let name = folderName;
    let time = new Date();
    if (name == "") {
      name = time.toLocaleString();
    }
    setFolderModal(false);
    setFolder([
      ...folder,
      {
        id: time.toLocaleString(),
        name: name,
        items: [],
      },
    ]);
    setFolderName("");
  };

  const callUpdateFolder = () => {
    let name = folderName;
    folder[Folderindex].name = name;
    setFolder([...folder]);
    setFolderName("");
    setFolderModal(false);
  };

  const deleteOneFolder = (id) => {
    let index = folder.findIndex((obj) => obj.id == id);
    Alert.alert(
      `delete folder`,
      `you are about to delete ${folder[index].name} this will delete evey preset for this folder. Are you sure this is what you want?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "delete",
          onPress: () => setFolder(folder.filter((item) => item.id !== id)),
        },
      ]
    );
  };

  const updateFolder = (name, id) => {
    let index = folder.findIndex((obj) => obj.id == id);
    setFolderIndex(index);
    setFolderName(name);
    setFolderUpdatePLaceHolder(name);
    setFolderUpdate(true);
    setFolderModal(true);
  };

  const deleteAllAlert = () => {
    Alert.alert(
      `delete folder`,
      `you are about to delete all folders this will delete evey preset for this folder. Are you sure this is what you want?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "delete",
          onPress: () => setFolder([]),
        },
      ]
    );
  };

  //********************************************************** */

  return (
    <View style={styles.container}>
      {/* folder modal */}
      <Modal
        isVisible={folderModal}
        coverScreen={true}
        style={{ margin: 0, flex: 1 }}>
        <View style={[Style.lightBackground, {}]}>
          {folderUpdate ? (
            <TextInput
              keyboardType='default'
              style={[Style.input, Style.DefaultFont]}
              placeholder={`${folderUpdatePLaceHolder}`}
              placeholderTextColor='white'
              maxLength={30}
              onChangeText={(val) => {
                if (val != 0) setFolderName(val);
              }}
            />
          ) : (
            <TextInput
              keyboardType='default'
              style={[Style.input, Style.DefaultFont]}
              placeholder='folder name'
              placeholderTextColor='white'
              maxLength={30}
              onChangeText={(val) => {
                if (val != 0) setFolderName(val);
              }}
            />
          )}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexBasis: "45%" }}
              onPress={() => setFolderModal(false)}>
              <Text style={[Style.buttonStyle]}>close</Text>
            </TouchableOpacity>
            <View style={{ flexBasis: "10%" }}></View>
            {folderUpdate ? (
              <TouchableOpacity
                style={{ flexBasis: "45%" }}
                onPress={() => callUpdateFolder()}>
                <Text style={[Style.buttonStyle, { backgroundColor: "green" }]}>
                  update
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ flexBasis: "45%" }}
                onPress={() => createFolder()}>
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
          create and edit folders here
        </Text>
        <TouchableOpacity onPress={() => openModal()}>
          <MaterialIcons name='create-new-folder' size={30} color='white' />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {folder.length > 0 ? (
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
                      onPress={() =>
                        navigation.navigate("folderPresets", {
                          id: data.id,
                        })
                      }>
                      <Text
                        style={[
                          Style.textColor,
                          Style.DefaultFont,
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
                    <TouchableOpacity onPress={() => deleteOneFolder(data.id)}>
                      <MaterialIcons name='delete' size={40} color='red' />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => updateFolder(data.name, data.id)}>
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}>
            <Text style={[Style.DefaultFont, Style.textColor]}>Empty</Text>
          </View>
        )}
      </View>
      {folder.length > 0 ? (
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => deleteAllAlert()}>
          <Text
            style={[
              Style.buttonStyle,
              { backgroundColor: "red", fontSize: 15, padding: 5 },
            ]}>
            DELETE ALL FOLDERS
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
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
