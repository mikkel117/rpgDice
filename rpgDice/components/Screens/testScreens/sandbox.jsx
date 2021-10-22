import React, { useState, useEffect, useRef } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Animated,
  Pressable,
} from "react-native";

import Style from "../../../assets/styles/styles";

export default function Sandbox() {
  const [isOn, setIsOn] = useState(false);
  const [color, setColor] = useState("green");

  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOn == false) {
      setColor("red");
    } else {
      setColor("green");
    }
  }, [isOn]);

  const animate = () => {
    setIsOn(!isOn);

    Animated.timing(translation, {
      toValue: isOn ? 0 : 40,
      easing: Easing.bounce,
      /* delay: 2000, */
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Pressable onPress={() => animate()}>
          <View
            style={{
              width: 70,
              height: 30,
              backgroundColor: `${color}`,
              borderRadius: 20,
            }}>
            <Animated.View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                backgroundColor: "white",
                transform: [{ translateX: translation }],
              }}
            />
          </View>
        </Pressable>
      </View>
      {/*       <TouchableOpacity onPress={() => animate()}>
        <Text style={[Style.buttonStyle]}>Start</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
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
