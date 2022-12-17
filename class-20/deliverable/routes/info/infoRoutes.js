const { Router } = require("express");
const { infoController } = require("../../controller");

const router = Router();

router.get("/", infoController.renderPage);

module.exports = router;
