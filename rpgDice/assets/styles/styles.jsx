import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  screenBackground: {
    backgroundColor: "#2E2E2E",
  },
  lightBackground: {
    backgroundColor: "#3b3b3b",
  },
  textColor: {
    color: "white",
  },
  defoultFont: {
    fontSize: 20,
  },
  buttonStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    backgroundColor: "blue",
  },
  input: {
    color: "white",
    borderWidth: 1,
    borderColor: "blue",
    padding: 8,
    margin: 10,
  },
  DiceNBuffContainer: {
    flexDirection: "row",
    flexBasis: "50%",
    justifyContent: "center",
  },
  diceNBuff: {
    borderWidth: 1,
    alignSelf: "center",
    width: 100,
    textAlign: "center",
    color: "white",
    fontSize: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Style;
