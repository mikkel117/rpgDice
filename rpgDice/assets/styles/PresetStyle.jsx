import { StyleSheet } from "react-native";
import Style from "./styles";

const lightBackground = Style.lightBackground.backgroundColor;
const textColor = Style.textColor.color;
const font = Style.DefaultFont.fontSize;

const PresetStyle = StyleSheet.create({
  presetContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
    marginTop: 20,
    flexDirection: "row",
    padding: 10,
  },
  diceButtonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  diceContainer: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: lightBackground,
  },
  buttonContainer: {
    flexShrink: 1,
    justifyContent: "space-between",
    marginLeft: 5,
  },
  buttonText: {
    color: textColor,
    fontSize: 18,
  },
  button: {
    backgroundColor: "gray",
    textAlign: "center",
    width: 50,
    padding: 10,
    color: textColor,
    fontSize: font,
  },
  deleteEditcontainer: {
    justifyContent: "center",
    flex: 0.8,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    color: textColor,
    fontSize: font,
  },
  deleteEditWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
});

export default PresetStyle;
