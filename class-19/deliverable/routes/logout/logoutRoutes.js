const { Router } = require("express");
const { guard } = require("../../middlewares");
const { logoutController } = require("../../controller");

const router = Router();

router.get("/", guard, logoutController.renderPage);

module.exports = router;
