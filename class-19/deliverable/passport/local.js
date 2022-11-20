const { Strategy: LocalStrategy } = require("passport-local");

const { userDAO } = require("../daos");
const { encrypt } = require("../utilities");

const login = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (_req, email, password, done) => {
    try {
      const user = await userDAO.getOneByEmail(email);
      if (!user) throw new Error("User not found");

      const isValidPassword = await encrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error("Invalid password");

      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(null, false);
    }
  }
);

const register = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (_req, email, password, done) => {
    try {
      const user = await userDAO.getOneByEmail(email);
      if (user) throw new Error("Email already exist");

      const newUser = await userDAO.create({ email, password });
      return done(null, newUser);
    } catch (error) {
      console.error(error);
      return done(null, false);
    }
  }
);

module.exports = { login, register };
