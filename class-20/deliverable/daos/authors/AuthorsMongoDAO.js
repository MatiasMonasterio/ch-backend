const authorModel = require("../../database/Mongo/models/Author");
const { AuthorsDTO } = require("../../dtos");

class AuthorsMongoDAO {
  async getOneByEmil(authorEmail) {
    const author = await authorModel.findOne({ email: authorEmail });
    return author ? new AuthorsDTO(author) : author;
  }

  async createOne(author) {
    const newAuthor = await authorModel.create(author);
    return new AuthorsDTO(newAuthor);
  }
}

module.exports = AuthorsMongoDAO;
