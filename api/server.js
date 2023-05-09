const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

const app = express();

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

require("dotenv").config();

mongoose.connect(process.env.MONGOURI).then(() => {
  console.log("Connected to mongo DB!");
});

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

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
