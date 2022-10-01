const { sqliteContainer } = require("../../containers");

class authorsDAO extends sqliteContainer {
  constructor() {
    super("users");
  }

  async findByEmail(email) {
    const authors = await this.getAll();
    return authors.find((author) => author.email === email);
  }
}

module.exports = new authorsDAO();
