const { sqlite } = require("../../databases");

const models = {
  products: "products",
  messages: "messages",
  "messages-normalized": "messagesNormalized",
  users: "users",
};

class sqliteContainer {
  model = null;

  constructor(model) {
    if (Object.keys(models).includes(model)) {
      this.model = models[model];
      // this.model = sqlite.from(models[model]);
      return;
    }

    throw new Error("Must define sqlite model as products or messages");
  }

  async getAll() {
    const respose = await sqlite.from(this.model).select("*");
    return respose;
  }

  async getOneById(id, isEmail) {
    if (isEmail) {
      const [resp] = await sqlite
        .from(this.model)
        .select("*")
        .where("email", id);
      return resp;
    }

    const [resp] = await sqlite.from(this.model).select("*").where("id", id);
    return resp;
  }

  async createOne(newObject) {
    const [id] = await sqlite.insert(newObject).into(this.model);
    return await this.getOneById(id);
  }
}

module.exports = sqliteContainer;
