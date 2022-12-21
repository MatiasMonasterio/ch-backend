const Joi = require("joi");

class Product {
  constructor(title, price, thumbnail) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  static validation(product, required) {
    const ProductSchema = Joi.object({
      title: required ? Joi.string().required() : Joi.string(),
      price: required ? Joi.number().required() : Joi.number(),
      thumbnail: required ? Joi.string().required() : Joi.string(),
    });

    const { error } = ProductSchema.validate(product);
    if (error) throw error;
  }
}

module.exports = Product;
