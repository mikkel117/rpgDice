import React from "react";

import { Text, View, StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome5 } from "@expo/vector-icons";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function Setting() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>setting</Text>
    </View>
  );
}

function EditProfile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>edit profile</Text>
    </View>
  );
}
/* <FontAwesome5 name="dice-d20" size={24} color="black" /> */
/* history */
/* edit */

const screenOptions = (route) => {
  let iconName;
  switch (route.route.name) {
    case "Home":
      iconName = "dice-d20";
      break;
    case "Historie":
      iconName = "history";
      break;
    case "Edit":
      iconName = "edit";
      break;
    default:
      break;
  }
  return <FontAwesome5 name={iconName} size={24} color='white' />;
};

const Tab = createBottomTabNavigator();

export default function Sandbox() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={(route) => ({
            tabBarIcon: () => screenOptions(route),
            tabBarLabelPosition: "below-icon",
            tabBarLabelStyle: {
              fontWeight: "700",
              fontSize: 13,
            },
            tabBarStyle: {
              backgroundColor: "#3b3b3b",
              padding: 0,
            },
            tabBarItemStyle: {
              borderWidth: 1,
            },
            headerStyle: {
              backgroundColor: "#3b3b3b",
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
            tabBarActiveBackgroundColor: "#2E2E2E",
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "white",
          })}>
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='Historie' component={Setting} />
          <Tab.Screen name='Edit' component={EditProfile} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
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
