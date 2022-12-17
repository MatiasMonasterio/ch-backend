const { MemoryDB } = require("../../database");
const { ProductDTO } = require("../../dtos");

class ProductsMemoDAO {
  constructor() {
    this.products = MemoryDB.products;
  }

  async getAll() {
    return this.products.map((product) => new ProductDTO(product));
  }

  async getOneById(productId) {
    const product = this.products.find((product) => product.id === productId);
    return product ? new ProductDTO(product) : product;
  }

  async createOne(product) {
    let newProduct = product;

    if (this.products.length === 0) {
      newProduct.id = 1;
    } else {
      newProduct.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(newProduct);
    return new ProductDTO(newProduct);
  }

  async deleteOneById(productId) {
    const productIndex = this.products.findIndex(
      (product) => product === productId
    );

    if (productIndex >= 0) {
      this.products.splice(productIndex, 1);
    }
  }
}

module.exports = ProductsMemoDAO;
