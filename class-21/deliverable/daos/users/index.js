const UsersFactory = require("./UsersFactory");
const { PERSISTANCE } = require("../../config/arg");

const usersFactoryInstance = new UsersFactory(PERSISTANCE);
module.exports = usersFactoryInstance.createUsersDAO();
