import { StyleSheet } from "react-native";

const Style = StyleSheet.create({
  screenBackground: {
    backgroundColor: "#2E2E2E",
  },
  lightBackground: {
    backgroundColor: "#47494E",
  },
  textColor: {
    color: "white",
  },
  DefaultFont: {
    fontSize: 20,
  },
  buttonStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 10,
    backgroundColor: "#5D686F",
  },
  input: {
    color: "white",
    borderWidth: 1,
    borderColor: "#A9CEC2",
    padding: 8,
    margin: 10,
    fontSize: 20,
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
