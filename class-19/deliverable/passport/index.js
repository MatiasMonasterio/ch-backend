const passport = require("passport");
const local = require("./local");

const { userDAO } = require("../daos");

passport.serializeUser((user, done) => {
  done(null, { id: user._id, email: user.email });
});

passport.deserializeUser(async (userCookie, done) => {
  const user = await userDAO.getOneById(userCookie.id);
  done(null, user);
});

passport.use("login", local.login);
passport.use("register", local.register);

module.exports = passport;
