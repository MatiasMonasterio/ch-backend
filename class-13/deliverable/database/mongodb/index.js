const mongoose = require("mongoose");
const { MONGO_URL } = require("../../config/env");

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connection successful");
  } catch (error) {
    throw new Error(`MongoDB connection error ${error}`);
  }
};

const disconnect = async () => {
  await mongoose.disconnect();
};

module.exports = { connect, disconnect };
