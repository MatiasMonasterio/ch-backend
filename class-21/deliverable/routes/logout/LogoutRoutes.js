const { Router } = require("express");
const { guard } = require("../../middlewares");
const { LogoutController } = require("../../controller");

const router = Router();

class LogoutRouter {
  constructor() {
    this.logoutController = new LogoutController();
  }

  start() {
    router.get("/", guard, this.logoutController.renderPage);
    return router;
  }
}

module.exports = LogoutRouter;
