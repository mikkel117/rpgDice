const DiceIconSelect = (dice) => {
  let diceIcon;
  switch (dice) {
    case 4:
      diceIcon = "dice-4";
      break;
    case 6:
      diceIcon = "dice-6";
      break;
    case 8:
      diceIcon = "dice-d8";
      break;
    case 10:
      diceIcon = "dice-d10";
      break;
    case 12:
      diceIcon = "dice-d12";
      break;
    case 20:
      diceIcon = "dice-d20";
      break;
    case 100:
      diceIcon = "dice-multiple";
      break;
    default:
      diceIcon = "dice-1";

      break;
  }
  return diceIcon;
};

export default DiceIconSelect;
