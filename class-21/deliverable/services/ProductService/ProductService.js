const { productsRepository } = require("../../repository");

class ProductService {
  async getAll() {
    return await productsRepository.getAll();
  }
}

module.exports = ProductService;
