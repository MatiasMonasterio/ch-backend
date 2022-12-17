const { Router } = require("express");
const { apiController } = require("../../controller");

const router = Router();

router.get("/products-test", apiController.productTest);
router.get("/randoms", apiController.randomNumber);

module.exports = router;
