const { sqliteContainer } = require("../../containers");
const { messageNormalize } = require("../../normalizers");

class messagesDAO extends sqliteContainer {
  constructor() {
    super("messages");
  }

  async getAllMessages() {
    const messages = await this.getAll();

    return messages.map((message) => ({
      ...message,
      author: JSON.parse(message.author),
    }));
  }

  async getAllMessagesNormalize() {
    const messages = await this.getAllMessages();
    return messageNormalize(messages);
  }
}

module.exports = new messagesDAO();
