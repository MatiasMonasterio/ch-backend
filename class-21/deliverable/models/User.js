const Joi = require("joi");

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static validation(user, required) {
    const UserSchema = Joi.object({
      email: required ? Joi.string().required() : Joi.string(),
      password: required ? Joi.string().required() : Joi.string(),
    });

    const { error } = UserSchema.validate(user);
    if (error) throw error;
  }
}

module.exports = User;
