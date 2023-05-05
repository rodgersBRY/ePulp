const bcrypt = require("bcrypt");

const Farmer = require("../models/farmer.model");
const { generateMembershipNumber } = require("../utlity_functions");

function throwError(errorText, statusCode) {
  const error = new Error(errorText);
  error.statusCode = statusCode;
  throw error;
}

exports.allFarmers = async (req, res, next) => {
  try {
    const farmers = await Farmer.find();

    res.status(200).json(farmers);
  } catch (err) {
    next(err);
  }
};

exports.addFarmer = async (req, res, next) => {
  const { fullName, phoneNumber, password } = req.body;

  try {
    const farmerExists = await Farmer.findOne({ phoneNumber: phoneNumber });

    if (farmerExists) throwError("Account with that phone number exists", 409);

    const hashedPassword = await bcrypt.hash(password, 12);

    var membershipNo = generateMembershipNumber();

    console.log(membershipNo);

    const farmer = new Farmer({
      fullName: fullName,
      phoneNumber: phoneNumber,
      membershipNo: membershipNo,
      password: hashedPassword,
    });

    const result = await farmer.save();

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.editFarmer = async (req, res, next) => {
    
};

exports.deleteFarmer = async (req, res, next) => {
  const farmerId = req.params.farmerId;

  try {
    const farmer = await Farmer.findById(farmerId);

    if (!farmer) throwError("Farmer not registered on the system", 404);

    await farmer.remove();

    return res.status(200).json({ message: "Farmer removed successfully" });
  } catch (err) {
    next(err);
  }
};

exports.addFarmerCoffeeAmount = async (req, res, next) => {};
