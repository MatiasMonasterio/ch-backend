const { Router } = require("express");
const { InfoController } = require("../../controller");

const router = Router();

class InfoRouter {
  constructor() {
    this.infoController = new InfoController();
  }

  start() {
    router.get("/", this.infoController.renderPage);
    return router;
  }
}

module.exports = InfoRouter;
