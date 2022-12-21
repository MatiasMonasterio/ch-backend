const ProductsMongoDAO = require("./ProductsMongoDAO");
const ProductsMemoDAO = require("./ProductsMemoDAO");

class ProductsFactory {
  createProductsDAO(persistance) {
    if (persistance === "memo") return new ProductsMemoDAO();
    else return new ProductsMongoDAO();
  }
}

module.exports = ProductsFactory;
