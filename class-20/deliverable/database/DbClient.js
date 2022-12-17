class DbClient {
  async connect() {
    throw new Error("connect fn no implemented");
  }

  async disconnect() {
    throw new Error("disconnect fn no implemented");
  }
}

module.exports = DbClient;
