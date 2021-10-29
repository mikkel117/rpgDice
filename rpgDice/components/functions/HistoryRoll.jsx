import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import Style from "../../assets/styles/styles";
import { HistoryContext } from "../context/HistoryContext";

export default function HistoryRoll(diceNumber, dice, buff) {
  const { history, setHistory, modalOpen, setModalOpen } =
    useContext(HistoryContext);

  const [rollArray, setRollArray] = useState([]);
  const [resoult, setResoult] = useState(0);

  useEffect(() => {
    if (modalOpen == true) {
      roll();
    }
  }, [modalOpen]);

  const roll = () => {
    let puchArray = [];
    for (let i = 0; i < diceNumber; i++) {
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
    setResoult(plus + buff);
    puchArray = [];
  };

  const setTheHistory = () => {
    let time = new Date();

    setHistory([
      ...history,
      {
        createdAt: time.toLocaleTimeString(),
        key: time.getMilliseconds(),
        hNumberOfDice: diceNumber,
        hDice: dice,
        hRolled: rollArray,
        hBuff: buff,
        hPlusEmAll: resoult,
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
            {diceNumber}d{dice}
            {buff ? <>{buff > 0 ? <>+{buff}</> : <>{buff}</>} </> : <></>}
          </Text>

          <Text
            style={[
              Style.textColor,
              { textAlign: "center", fontSize: 25, paddingBottom: 5 },
            ]}>
            {resoult}
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
