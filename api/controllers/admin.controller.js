const bcrypt = require("bcrypt");

const Farmer = require("../models/farmer.model");
const { generateRandomNumberWithPrefix } = require("../utlity_functions");

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

exports.getFarmer = async (req, res, next) => {
  const farmerId = req.params.farmerId;
  
  try {
    const farmer = await Farmer.findById(farmerId);

    if (!farmer) throwError("Farmer id not found!", 404);

    return res.status(200).json(farmer);
  } catch (err) {
    next(err);
  }
};


exports.addFarmer = async (req, res, next) => {
  const { fullName, phoneNumber, password, accountNo } = req.body;

  try {
    const farmerExists = await Farmer.findOne({ phoneNumber: phoneNumber });

    if (farmerExists) throwError("Account with that phone number exists", 409);

    const hashedPassword = await bcrypt.hash(password, 12);

    var membershipNo = generateRandomNumberWithPrefix();

    const farmer = new Farmer({
      fullName: fullName,
      phoneNumber: phoneNumber,
      membershipNo: membershipNo,
      accountNo: accountNo,
      password: hashedPassword,
    });

    const result = await farmer.save();

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.editFarmer = async (req, res, next) => {
  const farmerId = erq.params.farmerId;

  const { fullName, phoneNumber } = req.body;

  try {
    const farmer = await Farmer.findById(farmerId);

    if (!farmer) throwError("Farmer not found", 404);

    farmer.fullName = fullName;
    farmer.phoneNumber = phoneNumber;

    const result = await farmer.save();

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteFarmer = async (req, res, next) => {
  const farmerId = req.params.farmerId;

  try {
    const farmer = await Farmer.findByIdAndRemove(farmerId);

    if (!farmer) throwError("Farmer not registered on the system", 404);

    return res.status(200).json({ message: "Farmer removed successfully" });
  } catch (err) {
    next(err);
  }
};

exports.addFarmerCoffeeWeight = async (req, res, next) => {
  const farmerId = req.params.farmerId;
  const { weight } = req.body;

  try {
    const farmer = await Farmer.findById(farmerId);

    if (!farmer) throwError("Farmer not found", 404);

    const coffeeBatchesList = [...farmer.coffeeBatches];

    coffeeBatchesList.push({
      coffeeWeight: weight,
      dateOfDelivery: Date.now(),
    });

    farmer.coffeeBatches = coffeeBatchesList;
    farmer.totalWeight += parseInt(weight);

    const result = await farmer.save();

    return res
      .status(201)
      .json({ message: "weight has been recorded", result });
  } catch (err) {
    next(err);
  }
};
