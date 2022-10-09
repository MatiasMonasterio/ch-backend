const { normalize } = require("normalizr");
const messageSchema = require("./messageSchema");

const messageNormalize = (message) => {
  return normalize(message, [messageSchema]);
};

module.exports = messageNormalize;
