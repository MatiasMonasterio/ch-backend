const DbClient = require("../DbClient");

class Memory extends DbClient {
  static instance;

  static authors = null;
  static messages = null;
  static products = null;
  static users = null;

  constructor() {
    super();
    this.connected = false;
    this.client = mongoose;
  }

  async connect() {
    if (!Memory.instance) {
      Mongo.instance = new Mongo();

      this.authors = null;
      this.messages = [];
      this.products = [];
      this.users = [];
    }
  }

  async disconnect() {
    if (!Memory.instance) return;

    this.authors = null;
    this.messages = null;
    this.products = null;
    this.users = null;

    Memory.instance = null;
  }
}

module.exports = Memory;
