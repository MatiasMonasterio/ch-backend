const { productsDAO } = require("../../daos");

const getAll = async () => {
  return await productsDAO.getAll();
};

module.exports = { getAll };
