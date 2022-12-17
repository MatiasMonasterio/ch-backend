const { MemoryDB } = require("../../database");
const { AuthorsDTO } = require("../../dtos");

class AuthorsMemoDAO {
  constructor() {
    this.authors = MemoryDB.authors;
  }

  async getOneByEmil(email) {
    const author = this.authors.find((author) => author.email === email);
    return author ? new AuthorsDTO(author) : author;
  }

  async createOne(author) {
    let newAuthor = author;

    if (this.authors.length === 0) {
      newAuthor.id = 1;
    } else {
      newAuthor.id = this.authors[this.authors.length - 1].id + 1;
    }

    this.authors.push(newAuthor);
    return new AuthorsDTO(newAuthor);
  }
}

module.exports = new AuthorsMemoDAO();
