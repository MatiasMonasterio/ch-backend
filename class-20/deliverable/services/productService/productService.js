const { productsRepository } = require("../../repository");

const getAll = async () => {
  return await productsRepository.getAll();
};

module.exports = { getAll };
