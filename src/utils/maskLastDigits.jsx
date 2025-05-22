const MaskLastDigits = (number) => {
  const str = number.toString();
  const lastFour = str.slice(-4);
  return "****" + lastFour;
};

export default MaskLastDigits;
