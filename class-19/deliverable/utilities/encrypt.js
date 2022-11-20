const bcrypt = require("bcrypt");

const hash = async (value) => {
  return bcrypt.hashSync(value, bcrypt.genSaltSync(10), null);
};

const compare = async (data, encryped) => {
  return await bcrypt.compare(data, encryped);
};

module.exports = { hash, compare };
