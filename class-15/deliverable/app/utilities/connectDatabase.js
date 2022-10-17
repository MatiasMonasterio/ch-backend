const mongo = require("../database/mongodb");

module.exports = async function connectDatabase() {
  await mongo.connect();
};
