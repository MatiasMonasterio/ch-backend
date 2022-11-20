const { Router } = require("express");

const passport = require("../../passport");
const { guard } = require("../../middlewares");
const { registerController } = require("../../controller");

const router = Router();

const passportOptions = {
  successRedirect: "/",
  failureRedirect: "/register/error",
  passReqToCallback: true,
};

router.get("/", guard, registerController.renderPage);
router.post("/", guard, passport.authenticate("register", passportOptions));
router.get("/error", registerController.renderErrorPage);

module.exports = router;
