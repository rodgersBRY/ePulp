const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const farmerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  coffeeBatches: [
    {
      coffeeWeight: Number,
      dateOfDelivery: Date,
    },
  ],
});

module.exports = mongoose.model("Farmer", farmerSchema);
