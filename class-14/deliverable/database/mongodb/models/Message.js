const { Schema, model } = require("mongoose");
// const { authorSchema } = require("./Author");

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, require: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

const messageSchema = new Schema(
  {
    text: { type: String, required: true },
    author: authorSchema,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

module.exports = model("Message", messageSchema);
