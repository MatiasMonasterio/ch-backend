const ProductModel = require("../../database/Mongo/models/Product");

class ProductsMongoDAO {
  async getAll() {
    return await ProductModel.find();
  }

  async getOneById(messageId) {
    return await ProductModel.findById(messageId);
  }

  async createOne(message) {
    return await ProductModel.create(message);
  }

  async deleteOneById(messageId) {
    return await ProductModel.deleteOne({ _id: messageId });
  }
}

module.exports = ProductsMongoDAO;
