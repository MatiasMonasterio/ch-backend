const MessageModel = require("../../database/mongodb/models/Message");
const { messageNormalize } = require("../../normalizers");

class MessagesDAO {
  async getAll() {
    return await MessageModel.find();
  }

  async getAllNormalized() {
    const messages = await MessageModel.find();
    return messageNormalize(messages);
  }

  async getOneById(messageId) {
    return await MessageModel.findById(messageId);
  }

  async createOne(message) {
    return await MessageModel.create(message);
  }

  async deleteOneById(messageId) {
    return await MessageModel.deleteOne({ _id: messageId });
  }
}

module.exports = new MessagesDAO();
