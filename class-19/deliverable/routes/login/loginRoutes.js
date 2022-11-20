const { Router } = require("express");

const passport = require("../../passport");
const { guard } = require("../../middlewares");
const { loginController } = require("../../controller");

const router = Router();

const passportAuthLoginOpts = {
  successRedirect: "/",
  failureRedirect: "/login/error",
  passReqToCallback: true,
};

router.get("/", guard, loginController.renderPage);
router.post("/", guard, passport.authenticate("login", passportAuthLoginOpts));
router.get("/error", loginController.renderErrorPage);

module.exports = router;
