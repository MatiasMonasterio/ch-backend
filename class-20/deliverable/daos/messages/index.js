const MessagesFactory = require("./MessagesFactory");
const { PERSISTANCE } = require("../../config/arg");

const messagesFactoryInstance = new MessagesFactory(PERSISTANCE);
module.exports = messagesFactoryInstance.createMessagesDAO();
