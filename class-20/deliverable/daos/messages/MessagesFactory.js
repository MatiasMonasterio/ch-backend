const MessagesMongoDAO = require("./MessagesMongoDAO");
const MessagesMemoDAO = require("./MessagesMemoDAO");

class MessagesFactory {
  createMessagesDAO(persistance) {
    if (persistance === "memo") return new MessagesMemoDAO();
    else return new MessagesMongoDAO();
  }
}

module.exports = MessagesFactory;
