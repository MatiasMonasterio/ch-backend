const userModel = require("../../database/mongodb/models/User");
const { encrypt } = require("../../utilities");

class UserDAO {
  async getOneByEmail(userEmail) {
    return await userModel.findOne({ email: userEmail });
  }

  async getOneById(userId) {
    return await userModel.findById(userId);
  }

  async create(user) {
    user.password = await encrypt.hash(user.password);
    return userModel.create(user);
  }
}

module.exports = new UserDAO();
