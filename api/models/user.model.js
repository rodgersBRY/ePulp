const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
