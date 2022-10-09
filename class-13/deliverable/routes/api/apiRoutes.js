const { Router } = require("express");
const { guard } = require("../../middlewares");
const { productMock } = require("../../mocks");

const router = Router();

router.get("/products-test", guard, (_req, res) => {
  res.json({ data: productMock.getMany(5) });
});

module.exports = router;
