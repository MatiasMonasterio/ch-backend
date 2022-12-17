const { productsDAO } = require("../../daos");
const { ProductDTO } = require("../../dtos");

class ProductsRepository {
  constructor() {
    this.products = productsDAO;
  }

  async getAll() {
    const products = await this.products.getAll();
    return products.map((product) => new ProductDTO(product));
  }

  async getOneById(messageId) {
    const product = await this.products.getOneById(messageId);
    return product ? new ProductDTO(product) : product;
  }

  async createOne(message) {
    const newProduct = await this.products.createOne(message);
    return new ProductDTO(newProduct);
  }

  async deleteOneById(messageId) {
    return await this.products.deleteOneById(messageId);
  }
}

module.exports = new ProductsRepository();
