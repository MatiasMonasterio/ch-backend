const ProductsFactory = require("./ProductsFactory");
const { PERSISTANCE } = require("../../config/arg");

const productsFactoryInstance = new ProductsFactory(PERSISTANCE);
module.exports = productsFactoryInstance.createProductsDAO();
