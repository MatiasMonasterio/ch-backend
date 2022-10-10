const { Router } = require("express");
const { guard } = require("../../middlewares");

const router = Router();

router.get("/", guard, (req, res) => {
  const { name } = req.session;

  req.session.destroy((error) => {
    if (error) return res.send(`Logout error ${error}`);
    return res.render("logout", { username: name });
  });
});

module.exports = router;
