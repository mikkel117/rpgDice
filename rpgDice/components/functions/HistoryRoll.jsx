import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Style from "../../assets/styles/styles";
import Modal from "react-native-modal";

import { HistoryContext } from "../context/HistoryContext";

export default function HistoryRoll(
  setModanOpen,
  modalOpen,
  diceNumber,
  dice,
  buff,
  buffplus,
  rollArray,
  resoult
) {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modalOpen != 0) {
      setModal(true);
      console.log(modalOpen);
    }
  }, [modalOpen]);

  return (
    <Modal isVisible={modal} style={{ margin: 0 }}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        onPress={() => setModal(false)}>
        <View style={Style.lightBackground}>
          <Text
            style={[
              Style.textColor,
              Style.DefaultFont,
              { textAlign: "center", paddingBottom: 5 },
            ]}>
            {diceNumber}d{dice}
            {buff ? <>{buffplus ? <>+{buff}</> : <>{buff}</>} </> : <></>}
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
            {/* {rollArray.map((data) => {
              return (
                <Text key={data.key}>
                  {rollArray.length == 1 ? <>{data.item}</> : <>{data.item},</>}
                </Text>
              );
            })} */}
          </Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
