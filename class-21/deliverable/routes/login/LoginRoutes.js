const { Router } = require("express");

const passport = require("../../passport");
const { guard } = require("../../middlewares");
const { LoginController } = require("../../controller");

const router = Router();

const passportAuthLoginOpts = {
  successRedirect: "/",
  failureRedirect: "/login/error",
  passReqToCallback: true,
};

class LoginRouter {
  constructor() {
    this.loginController = new LoginController();
  }

  start() {
    router.get("/", guard, this.loginController.renderPage);
    router.post(
      "/",
      guard,
      passport.authenticate("login", passportAuthLoginOpts)
    );
    router.get("/error", this.loginController.renderErrorPage);

    return router;
  }
}

module.exports = LoginRouter;
