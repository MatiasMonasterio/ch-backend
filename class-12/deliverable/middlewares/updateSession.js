module.exports = function updateSession(req, _res, next) {
  req.session._garbage = Date();
  req.session.touch();
  return next();
};
