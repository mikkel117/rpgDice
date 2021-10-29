import React, { useContext, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

import { HistoryContext } from "../context/HistoryContext";
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
                      marginBottom: 5,
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
    </>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
