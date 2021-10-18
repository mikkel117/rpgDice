import React, { useContext, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import { HistoryContext } from "../context/HistoryConstext";
import Style from "../../assets/styles/styles";

export default function History() {
  const { history } = useContext(HistoryContext);
  return history.length == 0 ? (
    <>
      <View
        style={[
          Style.screenBackground,
          { flex: 1, alignItems: "center", justifyContent: "center" },
        ]}>
        <Text style={[Style.textColor, { fontSize: 20 }]}>Empty</Text>
      </View>
    </>
  ) : (
    <>
      <ScrollView style={[Style.screenBackground, { flex: 1 }]}>
        {history.map((data) => {
          return (
            <View
              key={data.key}
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "gray",
                flexDirection: "row",
                padding: 10,
              }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={[styles.resultContainer, Style.lightBackground]}>
                  <Text
                    style={[
                      styles.font,
                      Style.textColor,
                      { fontWeight: "bold" },
                    ]}>
                    {data.hPlusEmAll}
                  </Text>
                </View>

                <View style={{ paddingLeft: 5, flexShrink: 1 }}>
                  <Text style={[Style.textColor, { fontSize: 20 }]}>
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

                  <Text style={{ justifyContent: "flex-start", fontSize: 15 }}>
                    {data.hRolled.map((item) => {
                      return (
                        <Text key={item.key} style={Style.textColor}>
                          {" "}
                          {data.hRolled.length == 1 ? (
                            <>{item.item}</>
                          ) : (
                            <>{item.item},</>
                          )}{" "}
                        </Text>
                      );
                    })}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 0.3,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}>
                <Text style={[styles.font, Style.textColor]}>
                  {data.createdAt}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  font: {
    fontSize: 20,
  },
  resultContainer: {
    /* borderWidth: 1,  */
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
