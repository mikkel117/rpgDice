import React, { useState, useEffect, useContext } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { HistoryContext } from "../../context/HistoryContext";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Style from "../../../assets/styles/styles";

export default function Sandbox() {
  const { history, setHistory } = useContext(HistoryContext);

  const setTheHistory = () => {
    let time = new Date();

    setHistory([
      ...history,
      {
        createdAt: time.toLocaleTimeString(),
        key: time.getMilliseconds(),
        hNumberOfDice: "1",
        hDice: "1",
        hRolled: [
          {
            key: 1,
            item: Math.floor(Math.random() * 10) + 1,
          },
        ],
        hBuff: 10,
        hPlusEmAll: Math.floor(Math.random() * 20) + 1,
      },
    ]);
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ borderBottomWidth: 2 }}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 40 }}>
          welcome to sandbox
        </Text>
        <Button title='click me' onPress={() => setTheHistory()} />
      </View>
      <ScrollView style={[Style.screenBackground, { flex: 1 }]}>
        {history.map((data) => {
          return (
            <View
              key={data.key}
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: "gray",
                flexDirection: "row",
                padding: 10,
                marginBottom: 20,
              }}>
              <View style={[styles.resultContainer, Style.lightBackground]}>
                <Text
                  style={[
                    Style.DefaultFont,
                    Style.textColor,
                    { fontWeight: "bold" },
                  ]}>
                  {data.hPlusEmAll}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flex: 1,
                  flexDirection: "column",
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                    }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[Style.textColor, Style.DefaultFont]}>
                        {data.hNumberOfDice}d{data.hDice}
                        {data.hBuff ? (
                          <>
                            {data.hBuff > 0 ? (
                              <>+{data.hBuff}</>
                            ) : (
                              <>{data.hBuff}</>
                            )}{" "}
                          </>
                        ) : (
                          <></>
                        )}
                      </Text>
                    </View>
                    <View style={[{ flex: 1, alignItems: "flex-end" }]}>
                      <Text style={[Style.DefaultFont, Style.textColor]}>
                        {data.createdAt}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ justifyContent: "flex-start", fontSize: 15 }}>
                    {data.hRolled.map((item) => {
                      return (
                        <Text key={item.key} style={Style.textColor}>
                          {data.hRolled.length == 1 ? (
                            <>{item.item}</>
                          ) : (
                            <>{item.item},</>
                          )}
                        </Text>
                      );
                    })}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  resultContainer: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
