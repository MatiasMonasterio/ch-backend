const ProductModel = require("../../database/mongodb/models/Product");

class MessagesDAO {
  async getAll() {
    const products = await ProductModel.find();
    return products.map((product) => ({
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
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

module.exports = new MessagesDAO();
