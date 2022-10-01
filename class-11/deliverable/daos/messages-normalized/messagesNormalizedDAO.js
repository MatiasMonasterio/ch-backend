const { sqliteContainer } = require("../../containers");
const { messageNormalize } = require("../../normalizers");

class messagesNormalizedDAO extends sqliteContainer {
  constructor() {
    super("messages-normalized");
  }

  async getAllNormilized() {
    const messages = await this.getAll();

    messages.forEach((message) => {
      message.author = JSON.parse(message.author);
    });

    return messageNormalize(messages);
  }
}

module.exports = new messagesNormalizedDAO();
