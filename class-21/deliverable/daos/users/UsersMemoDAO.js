const { MemoryDB } = require("../../database");
const { UserDTO } = require("../../dtos");
const { encrypt } = require("../../utilities");

class UsersMemoDAO {
  constructor() {
    this.users = MemoryDB.users;
  }

  async getOneByEmail(userEmail) {
    const user = this.users.find((user) => user.email === userEmail);
    return user ? new UserDTO(user) : user;
  }

  async getOneById(userId) {
    const user = this.users.find((user) => user.id === userId);
    return user ? new UserDTO(user) : user;
  }

  async create(user) {
    user.password = await encrypt.hash(user.password);
    let newUser = user;

    if (this.users.length === 0) {
      newUser.id = 1;
    } else {
      newUser.id = this.users[this.users.length - 1].id + 1;
    }

    this.users.push(newUser);
    return new UserDTO(newUser);
  }
}

module.exports = UsersMemoDAO;
