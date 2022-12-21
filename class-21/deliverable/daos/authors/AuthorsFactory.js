const AuthorsMongoDAO = require("./AuthorsMongoDAO");
const AuthorsMemoDAO = require("./authorsMemoDAO");

class AuthorsFactory {
  createAuthorsDAO(persistance) {
    if (persistance === "memo") return new AuthorsMemoDAO();
    else return new AuthorsMongoDAO();
  }
}

module.exports = AuthorsFactory;
