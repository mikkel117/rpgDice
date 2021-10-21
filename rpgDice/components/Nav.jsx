import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Dice from "./Screens/Dice";
import Historie from "./Screens/History";
import Presets from "./Screens/Presets";
import EditDice from "./Screens/EditDice";
import EditSettings from "./Screens/EditSettings";
import Folders from "./Screens/Folders";
import Settings from "./Screens/Settings";

import SandBox from "./Screens/testScreens/sandbox";

import Style from "../assets/styles/styles";

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

const Stack = createNativeStackNavigator();
function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        /* headerShown: false, */
        headerStyle: {
          backgroundColor: "#47494E",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        animation: "fade",
      }}>
      <Stack.Screen
        name='Edit settings'
        component={EditSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='folders'
        component={Folders}
        options={({ navigation }) => ({
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("preset")}>
                <Text style={Style.buttonStyle}>pre sets</Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      <Stack.Screen name='EditDice' component={EditDice} />
      <Stack.Screen
        name='preset'
        component={Presets}
        options={({ navigation }) => ({
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("folders")}>
                <Text style={Style.buttonStyle}>folders</Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen name='settings' component={Settings} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={(route) => ({
          tabBarIcon: () => screenOptions(route),
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
          tabBarStyle: {
            backgroundColor: "#47494E",
          },
          tabBarItemStyle: {
            borderWidth: 1,
          },
          headerStyle: {
            backgroundColor: "#47494E",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          tabBarActiveBackgroundColor: "#47494E",
          tabBarActiveTintColor: "#A9CEC2",
          tabBarInactiveTintColor: "white",
        })}>
        <Tab.Screen name='Home' component={Dice} />
        <Tab.Screen name='Historie' component={Historie} />
        <Tab.Screen
          name='Edit'
          component={StackScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("settings")}>
                  <Ionicons
                    name='settings'
                    size={30}
                    color='white'
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        {/* <Tab.Screen name='Sandbox' component={SandBox} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
