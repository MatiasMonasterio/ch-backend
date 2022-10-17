const { Router } = require("express");

const passport = require("../../passport");
const { guard } = require("../../middlewares");

const router = Router();

router.get("/", guard, (req, res) => {
  if (req.session.auth) return res.redirect("/");
  return res.render("login");
});

router.post(
  "/",
  guard,
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login/error",
    passReqToCallback: true,
  })
);

router.get("/error", (_req, res) => {
  return res.render("error-login");
});

module.exports = router;
