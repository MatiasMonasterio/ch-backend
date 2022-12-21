const { MemoryDB } = require("../../database");
const { MessageDTO } = require("../../dtos");
const { messageNormalize } = require("../../normalizers");

class MessagesMemoDAO {
  constructor() {
    this.messages = MemoryDB.messages;
  }

  async getAll() {
    return this.messages.map((message) => new MessageDTO(message));
  }

  async getAllNormalized() {
    return messageNormalize(this.messages);
  }

  async getOneById(messageId) {
    const message = this.messages.find((message) => message.id === messageId);
    return message ? new MessageDTO(message) : message;
  }

  async createOne(message) {
    let newMessage = message;

    if (this.messages.length === 0) {
      newMessage.id = 1;
    } else {
      newMessage.id = this.messages[this.messages.length - 1].id + 1;
    }

    this.messages.push(newMessage);
    return new MessageDTO(newMessage);
  }

  async deleteOneById(messageId) {
    const messageIndex = this.messages.findIndex(
      (message) => message === messageId
    );

    if (messageIndex >= 0) {
      this.messages.splice(messageIndex, 1);
    }
  }
}

module.exports = new MessagesMemoDAO();
