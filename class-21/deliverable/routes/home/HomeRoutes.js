const { Router } = require("express");
const { guard } = require("../../middlewares");
const { HomeController } = require("../../controller");

const router = Router();

class HomeRouter {
  constructor() {
    this.homeController = new HomeController();
  }

  start() {
    router.get("/", guard, this.homeController.renderPage);
    return router;
  }
}

module.exports = HomeRouter;
