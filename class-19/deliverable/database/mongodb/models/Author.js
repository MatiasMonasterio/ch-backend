const { Schema, model } = require("mongoose");

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

exports.authorSchema = authorSchema;
module.exports = model("Author", authorSchema);
