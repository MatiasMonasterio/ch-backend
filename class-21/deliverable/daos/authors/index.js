const AuthorsFactory = require("./AuthorsFactory");
const { PERSISTANCE } = require("../../config/arg");

const authorsFactoryInstance = new AuthorsFactory(PERSISTANCE);
module.exports = authorsFactoryInstance.createAuthorsDAO();
