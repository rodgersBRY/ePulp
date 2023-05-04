const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();

mongoose.connect(process.env.MONGOURI).then(() => {
  console.log("Connected to mongo DB successfully!");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data,
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
