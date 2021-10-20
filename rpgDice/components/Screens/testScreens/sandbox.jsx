import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Style from "../../../assets/styles/styles";

import folders from "./folders";
import presets from "./preSets";

//storage keys
//presets
//folders
//dice
const Stack = createNativeStackNavigator();
export default function Sandbox() {
  const [preSetDefoult, setPreSetDefoult] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#47494E",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          animation: "fade",
        })}>
        {preSetDefoult ? (
          <Stack.Screen name='preset' component={presets} />
        ) : (
          <>
            <Stack.Screen
              name='Home'
              component={folders}
              options={({ navigation }) => ({
                headerRight: () => (
                  <View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("preset")}>
                      <Text style={Style.buttonStyle}>pre sets</Text>
                    </TouchableOpacity>
                  </View>
                ),
              })}
            />
            <Stack.Screen name='preset' component={presets} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* const styles = StyleSheet.create({
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
}); */
