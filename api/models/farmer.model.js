const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const farmerSchema = new Schema({
  membershipNo: {
    type: String,
    unique: true,
    required: true,
  },
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
  totalWeight: {
    type: Number,
    default: 0,
  },
  accountNo: {
    type: Number,
    required: true
  },
  coffeeBatches: [
    {
      coffeeWeight: Number,
      dateOfDelivery: Date,
    },
  ],
});

module.exports = mongoose.model("Farmer", farmerSchema);
