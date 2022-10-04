const { Router } = require("express");
const { guard } = require("../../middlewares");
const router = Router();

router.get("/", guard, (req, res) => {
  if (req.session.auth) return res.redirect("/");
  return res.render("login");
});

router.post("/", guard, (req, res) => {
  const { name } = req.body;

  req.session.name = name;
  req.session.auth = true;

  return res.redirect("/");
});

module.exports = router;
