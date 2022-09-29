const config = require("./config");
const knex = require("knex");

const mysqlClient = knex(config);

module.exports = mysqlClient;
