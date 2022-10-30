const { Router } = require("express");

const passport = require("../../passport");
const { guard } = require("../../middlewares");

const router = Router();

router.get("/", guard, (_req, res) => {
  return res.render("register");
});

router.post(
  "/",
  guard,
  passport.authenticate("register", {
    successRedirect: "/",
    failureRedirect: "/register/error",
    passReqToCallback: true,
  })
);

router.get("/error", (_req, res) => {
  return res.render("error-register");
});

module.exports = router;
