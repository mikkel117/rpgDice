import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
} from "react-native";

import Style from "../../../assets/styles/styles";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
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
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      {/*       <Button
        title='go to settings'
        onPress={() =>
          navigation.navigate("settings", {
            folder
          })
        }
      /> */}
      {folder.map((data) => {
        return (
          <TouchableOpacity
            key={data.id}
            onPress={() =>
              navigation.navigate("settings", {
                id: data.id,
                name: data.name,
                items: data.items,
              })
            }>
            <Text style={[Style.buttonStyle, { marginVertical: 20 }]}>
              {data.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Settings({ route, navigation }) {
  console.log(route);
  const { name, id, items } = route.params;
  console.log("array", items);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>settings Screen</Text>
      {/* <Text>item: {JSON.stringify(item)}</Text> */}
      <Button title='go to home' onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function Sandbox() {
  return (
    /*     <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
      </View>
      <View style={{ alignItems: "center" }}></View>
    </SafeAreaView> */
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name='settings' component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
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

/* 
<View>
<TouchableOpacity onPress={() => setIsOn(!isOn)}>
  <Text
    style={[
      Style.defoultFont,
      Style.textColor,
      { padding: 20, backgroundColor: `${color}` },
    ]}>
    {isOn ? <>on</> : <>off</>}
  </Text>
</TouchableOpacity>
</View> */
