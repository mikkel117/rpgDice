import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";

export default function DiceHistoryRoll(diceCount, dice, diceModifier) {
  const { history, setHistory, modalOpen, setModalOpen } =
    useContext(HistoryContext);

  const [rollArray, setRollArray] = useState([]);
  const [rollTotal, setRollTotal] = useState(0);

  useEffect(() => {
    if (modalOpen == true) {
      roll();
    }
  }, [modalOpen]);

  const roll = () => {
    let puchArray = [];
    for (let i = 0; i < diceCount; i++) {
      puchArray.push({
        key: i,
        item: Math.floor(Math.random() * dice) + 1,
      });
    }
    setRollArray(puchArray);
    let plus = 0;
    puchArray.map((data) => {
      plus += data.item;
    });
    setRollTotal(plus + diceModifier);
    puchArray = [];
  };

  const setTheHistory = () => {
    let time = new Date();

    setHistory([
      ...history,
      {
        createdAt: time.toLocaleTimeString(),
        key: time.getMilliseconds(),
        diceCount: diceCount,
        dice: dice,
        diceModifier: diceModifier,
        rollArray: rollArray,
        rollTotal: rollTotal,
      },
    ]);
  };

  const close = () => {
    setTheHistory();
    setModalOpen(false);
  };

  return (
    <Modal isVisible={modalOpen} style={{ margin: 0 }}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        onPress={() => close()}>
        <View style={Style.lightBackground}>
          <Text
            style={[
              Style.textColor,
              Style.DefaultFont,
              { textAlign: "center", paddingBottom: 5 },
            ]}>
            {diceCount}d{dice}
            {diceModifier ? (
              <>
                {diceModifier > 0 ? <>+{diceModifier}</> : <>{diceModifier}</>}{" "}
              </>
            ) : (
              <></>
            )}
          </Text>

          <Text
            style={[
              Style.textColor,
              { textAlign: "center", fontSize: 25, paddingBottom: 5 },
            ]}>
            {rollTotal}
          </Text>

          <Text
            style={[
              Style.textColor,
              Style.DefaultFont,
              { textAlign: "center", paddingBottom: 5 },
            ]}>
            {rollArray.map((data) => {
              return (
                <Text key={data.key}>
                  {rollArray.length == 1 ? <>{data.item}</> : <>{data.item},</>}
                </Text>
              );
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
