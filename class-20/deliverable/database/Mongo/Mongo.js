const mongoose = require("mongoose");
const { MONGO_URL } = require("../../config/env");
const DbClient = require("../DbClient");

class Mongo extends DbClient {
  static instance = null;

  constructor() {
    super();
    this.connected = false;
    this.client = mongoose;
  }

  async connect() {
    if (!Mongo.instance) {
      Mongo.instance = new Mongo();

      try {
        await mongoose.connect(MONGO_URL);
        this.connected = true;
        console.log("MongoDB connection successful");
      } catch (error) {
        throw new AppError(500, "MongoDB connection error", error);
      }
    }
  }

  async disconnect() {
    if (!Mongo.instance) return;

    try {
      await mongoose.disconnect();
      this.connected = false;
      Mongo.instance = null;
      console.log("MongoDB discconnect successful");
    } catch (error) {
      throw new AppError(500, "MongoDB disconnect error", error);
    }
  }
}

module.exports = Mongo;
