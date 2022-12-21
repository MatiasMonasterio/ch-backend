const Joi = require("joi");

class Message {
  constructor(text, author) {
    this.text = text;
    this.author = author;
  }

  static validation(message, required) {
    const MessageSchema = Joi.object({
      name: required ? Joi.string().required() : Joi.string(),
    });

    const { error } = MessageSchema.validate(message);
    if (error) throw error;
  }
}

module.exports = Message;
