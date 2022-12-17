const { PERSISTANCE } = require("../config/arg");

const Mongo = require("../database/Mongo");
const Memory = require("../database/Memory");

module.exports = async function connectDatabase() {
  if (PERSISTANCE === "mongo") return await new Mongo().connect();
  else return await new Memory().connect();
};
