module.exports = function guard(req, res, next) {
  const originalUrl = req.originalUrl;
  const isAuth = req.isAuthenticated();

  if ((originalUrl === "/login" || originalUrl === "/register") && isAuth) {
    return res.redirect("/");
  }

  if (!isAuth && originalUrl.startsWith("/api")) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (originalUrl !== "/login" && originalUrl !== "/register" && !isAuth) {
    return res.redirect("/login");
  }

  return next();
};
