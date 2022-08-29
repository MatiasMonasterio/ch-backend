const config = require("./config");
const knex = require("knex");

const sqliteClient = knex(config);

module.exports = sqliteClient;
