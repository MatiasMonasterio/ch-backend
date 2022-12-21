const userModel = require("../../database/Mongo/models/User");
const { UserDTO } = require("../../dtos");
const { encrypt } = require("../../utilities");

class UsersMongoDAO {
  async getOneByEmail(userEmail) {
    const user = await userModel.findOne({ email: userEmail });
    return user ? new UserDTO(user) : user;
  }

  async getOneById(userId) {
    const user = await userModel.findById(userId);
    return user ? new UserDTO(user) : user;
  }

  async create(user) {
    user.password = await encrypt.hash(user.password);
    const newUser = userModel.create(user);
    return new UserDTO(newUser);
  }
}

module.exports = UsersMongoDAO;
