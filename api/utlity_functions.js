function generateRandomNumberWithPrefix() {
  const prefix = "FM-";
  const randomNumber = Math.floor(Math.random() * 10000); // Generate a random 6-digit number
  const formattedNumber = randomNumber.toString().padStart(4, "0"); // Pad the number with leading zeros if necessary
  const result = prefix + formattedNumber;
  return result;
}

module.exports = { generateRandomNumberWithPrefix };
