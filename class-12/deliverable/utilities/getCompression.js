const util = require("util");

module.exports = function getCompression(current, normalized) {
  let compression = 0;

  if (current.length) {
    compression =
      100 -
      (util.inspect(normalized, true).length * 100) /
        util.inspect(current, true).length;
  }

  return compression.toFixed(0);
};
