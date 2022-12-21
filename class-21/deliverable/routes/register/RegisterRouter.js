const { Router } = require("express");

const passport = require("../../passport");
const { guard } = require("../../middlewares");
const { RegisterController } = require("../../controller");

const router = Router();

const passportOptions = {
  successRedirect: "/",
  failureRedirect: "/register/error",
  passReqToCallback: true,
};

class RegisterRouter {
  constructor() {
    this.registerController = new RegisterController();
  }

  start() {
    router.get("/", guard, this.registerController.renderPage);
    router.post("/", guard, passport.authenticate("register", passportOptions));
    router.get("/error", this.registerController.renderErrorPage);

    return router;
  }
}

module.exports = RegisterRouter;
