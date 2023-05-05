let currentNumber = 1;

function generateMembershipNumber() {
  const membershipNumber = `M${currentNumber.toString().padStart(4, "0")}`;
  currentNumber++;
  return membershipNumber;
}

module.exports = {
  generateMembershipNumber,
};
