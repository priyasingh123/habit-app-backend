const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDB() {
  const url = process.env.MONGO_URI;
  const localUrl = "mongodb://localhost:27017/habit-app";
  try {
    await mongoose.connect(url);
    console.log("connected");
  } catch (e) {
    console.log("error occured", e);
  }
}

module.exports = connectToDB;
