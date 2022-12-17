const { Router } = require("express");
const { guard } = require("../../middlewares");
const { homeController } = require("../../controller");

const router = Router();

router.get("/", guard, homeController.renderPage);

module.exports = router;
