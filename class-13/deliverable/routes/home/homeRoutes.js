const { Router } = require("express");
const { guard } = require("../../middlewares");
const { productsDAO } = require("../../daos");

const router = Router();

router.get("/", guard, async (req, res) => {
  const { passport } = req.session;

  try {
    const products = await productsDAO.getAll();

    return res.render("index", {
      username: passport.user.email,
      products: products,
    });
  } catch (error) {
    console.error(error);
    return res.send("Error 500");
  }
});

module.exports = router;
