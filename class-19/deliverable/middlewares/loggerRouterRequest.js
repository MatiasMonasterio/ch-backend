const logger = require("../logger");

module.exports = function updateSession(req, _res, next) {
  logger.info(req.originalUrl);
  logger.info(req.method);
  return next();
};
