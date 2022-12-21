const AuthorDTO = require("../authors");

class MessageDTO {
  constructor(message) {
    this.text = message.text;
    this.author = new AuthorDTO(message.author);
  }
}

module.exports = MessageDTO;
