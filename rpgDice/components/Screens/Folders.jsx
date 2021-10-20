import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
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
      name: "Peter the knith",
      items: [
        { id: 1, name: "Sword attack", numberOfDice: 1, dice: 20, buff: 10 },
      ],
    },
  ]);

  //********************************************************** */
  //folder
  const [Folderindex, setFolderIndex] = useState(0);
  const [showFolder, setShowFolder] = useState(true);
  const [folderClicked, setFolderClicked] = useState(false);
  //********************************************************** */

  const getIndex = (id) => {
    let index = folder.findIndex((obj) => obj.id == id);
    setFolderIndex(index);
    /* setFolderClicked(true); */
    setShowFolder(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center" }}>
        <Text style={[Style.textColor, { fontSize: 40 }]}>
          welcome to sandbox
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {showFolder ? (
          <>
            {folder.map((data) => {
              return (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => getIndex(data.id)}>
                  <Text
                    style={[
                      Style.defoultFont,
                      Style.textColor,
                      { padding: 10, margin: 10, backgroundColor: "blue" },
                    ]}>
                    {data.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </>
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
});
