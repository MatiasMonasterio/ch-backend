const { schema } = require("normalizr");

const authorSchema = new schema.Entity("authors");
// const textSchema = new schema.Entity("texts");

module.exports = new schema.Entity("messages", {
  author: authorSchema,
  // text: textSchema,
});
