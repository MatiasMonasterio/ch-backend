const { messagesDAO } = require("../../daos");
const { MessageDTO } = require("../../dtos");

class MessagesRepository {
  constructor() {
    this.messages = messagesDAO;
  }

  async getAll() {
    const messages = await this.messages.getAll();
    return messages.map((message) => new MessageDTO(message));
  }

  async getAllNormalized() {
    return await this.messages.getAllNormalized();
  }

  async getOneById(messageId) {
    const message = await this.messages.getOneById(messageId);
    return message ? new MessageDTO(message) : message;
  }

  async createOne(message) {
    const newMessage = await this.messages.createOne(message);
    return new MessageDTO(newMessage);
  }

  async deleteOneById(messageId) {
    return await this.messages.deleteOneById(messageId);
  }
}

module.exports = new MessagesRepository();
