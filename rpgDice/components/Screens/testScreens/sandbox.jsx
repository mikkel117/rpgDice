import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Styles from "../../../assets/styles/styles";
import presets from "../Presets";

//storage keys
//presets
//folders
//dice

export default function Sandbox() {
  const [folder, setFolder] = useState([]);
  const [valTest, setValTest] = useState();

  /*   useEffect(() => {
    keysCheck();
  }, []); */

  getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }

    console.log(keys);
  };

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log("Done.");
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.color}>Welcome</Text>
        <Button title='store data' onPress={() => storeData()} />
        <View style={{ marginTop: 20 }}>
          <Button title='get all keys' onPress={() => getAllKeys()} />
        </View>

        <View>
          {folder.length > 0 ? (
            <>
              {folder.map((data) => {
                console.log("data", data);
                return (
                  <TouchableOpacity key={data.id}>
                    <Text
                      style={[
                        Styles.buttonStyle,
                        {
                          borderWidth: 1,
                          margin: 5,
                          padding: 10,
                          fontSize: 20,
                        },
                      ]}>
                      {data.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </View>
      </SafeAreaView>
      <TouchableOpacity
        style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}
        onPress={() => clearAll()}>
        <Text
          style={[
            Styles.buttonStyle,
            {
              borderWidth: 1,
              margin: 5,
              padding: 10,
              fontSize: 15,
              backgroundColor: "red",
            },
          ]}>
          CLEAR ALL KEYS
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    alignItems: "center",
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
