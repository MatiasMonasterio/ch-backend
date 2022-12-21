const UsersMongoDAO = require("./UsersMongoDAO");
const UsersMemoDAO = require("./UsersMemoDAO");

class UsersFactory {
  createUsersDAO(persistance) {
    if (persistance === "memo") return new UsersMemoDAO();
    else return new UsersMongoDAO();
  }
}

module.exports = UsersFactory;
