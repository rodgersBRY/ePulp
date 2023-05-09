const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

function throwError(errorText, statusCode) {
  const error = new Error(errorText);
  error.statusCode = statusCode;
  throw error;
}

exports.register = async (req, res, next) => {
  const { name, phone, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber: phone });

    if (user) throwError("User already registered", 409);

    const hashedPass = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullName: name,
      phoneNumber: phone,
      password: hashedPass,
    });

    await newUser.save();

    return res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { phone, password } = req.body;

  let loadedUser;

  try {
    const user = await User.findOne({ phoneNumber: phone });

    if (!user) throwError("User is not registered", 404);

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) throwError("Password is incorrect", 401);

    loadedUser = user;

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      userId: loadedUser._id.toString(),
      token,
      loadedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.reset = async (req, res, next) => {};
