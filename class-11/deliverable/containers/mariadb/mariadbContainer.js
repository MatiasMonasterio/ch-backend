const { mariadb } = require("../../databases");

const models = {
  products: "products",
  messages: "messages",
};

class mariadbContainer {
  model = null;

  constructor(model) {
    if (Object.keys(models).includes(model)) {
      this.model = mariadb.from(models[model]);
      return;
    }

    throw new Error("Must define mariaDB model as products or messages");
  }

  async getAll() {
    return await this.model.select("*");
  }

  async createOne(newObject) {
    await this.model.insert(newObject);
  }
}

module.exports = mariadbContainer;
