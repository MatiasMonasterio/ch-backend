const productsDAO = require("./products");
const messagesDAO = require("./messages");

const authorsDAO = require("./authors");
const messagesNormalizedDAO = require("./messages-normalized");

module.exports = {
  productsDAO,
  messagesDAO,
  authorsDAO,
  messagesNormalizedDAO,
};
