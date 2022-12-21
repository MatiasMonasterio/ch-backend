const Joi = require("joi");

class Author {
  constructor(name, lastname, email, age, alias, avatar) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.age = age;
    this.alias = alias;
    this.avatar = avatar;
  }

  static validation(author, required) {
    const AuthorSchema = Joi.object({
      name: required ? Joi.string().required() : Joi.string(),
      lastname: required ? Joi.string().required() : Joi.string(),
      email: required ? Joi.string().required() : Joi.string(),
      age: required ? Joi.number().required() : Joi.number(),
      alias: required ? Joi.string().required() : Joi.string(),
      avatar: required ? Joi.string().required() : Joi.string(),
    });

    const { error } = AuthorSchema.validate(author);
    if (error) throw error;
  }
}

module.exports = Author;
