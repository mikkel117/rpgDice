import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dice from "./Screens/Dice";
import Historie from "./Screens/History";
import Presets from "./Screens/Presets";
import EditDice from "./Screens/EditDice";
import settings from "./Screens/settings";

import SandBox from "./Screens/testScreens/sandbox";

const Stack = createNativeStackNavigator();
function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        /* headerShown: false, */
        headerStyle: {
          backgroundColor: "#3b3b3b",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
        animation: "fade",
      }}>
      <Stack.Screen name='setting' component={settings} />
      <Stack.Screen name='preset' component={Presets} />
      <Stack.Screen name='EditDice' component={EditDice} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: "beside-icon",
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 13,
          },
          tabBarStyle: {
            backgroundColor: "#3b3b3b",
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
          tabBarIconStyle: { display: "none" },
        }}>
        <Tab.Screen name='Home' component={Dice} />
        <Tab.Screen name='Historie' component={Historie} />
        <Tab.Screen name='Edit' component={StackScreen} />
        {/* <Tab.Screen name='Sandbox' component={SandBox} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
