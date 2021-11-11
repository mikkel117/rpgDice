import React, { useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

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
      <View style={[Style.screenBackground, { flex: 1 }]}>
        <FlatList
          data={history}
          renderItem={({ item }) => {
            return (
              <View
                key={item.key}
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
                    {item.rollTotal}
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
                          {item.diceCount}d{item.dice}
                          {item.diceModifier ? (
                            <>
                              {item.diceModifier > 0 ? (
                                <>+{item.diceModifier}</>
                              ) : (
                                <>{item.diceModifier}</>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </Text>
                      </View>
                      <View style={[{ flex: 1, alignItems: "flex-end" }]}>
                        <Text style={[Style.DefaultFont, Style.textColor]}>
                          {item.createdAt}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{ justifyContent: "flex-start", fontSize: 15 }}>
                      {item.rollArray.map((item) => {
                        return (
                          <Text key={item.key} style={Style.textColor}>
                            {item.item},
                          </Text>
                        );
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
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
