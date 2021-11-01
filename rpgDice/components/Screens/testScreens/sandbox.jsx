import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Style from "../../../assets/styles/styles";

/* export default function Sandbox() {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
      </View>
    </SafeAreaView>
  );
} */

function home() {
  return (
    <View style={[Style.screenBackground, { flex: 1, alignItems: "center" }]}>
      <Text style={[Style.textColor, Style.DefaultFont]}>Home</Text>
    </View>
  );
}
function settings() {
  return (
    <View style={[Style.screenBackground, { flex: 1, alignItems: "center" }]}>
      <Text style={[Style.textColor, Style.DefaultFont]}>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
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
        <Tab.Screen name='home' component={home} />
        <Tab.Screen name='settings' component={settings} />
      </Tab.Navigator>
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
