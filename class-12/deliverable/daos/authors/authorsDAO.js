const authorModel = require("../../database/mongodb/models/Author");

class AuthorsDAO {
  getOneByEmil(authorEmail) {
    return authorModel.findOne({ email: authorEmail });
  }

  createOne(author) {
    return authorModel.create(author);
  }
}

module.exports = new AuthorsDAO();
