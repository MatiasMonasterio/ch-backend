const { Router } = require("express");
const { ApiController } = require("../../controller");

const router = Router();

class ApiRouter {
  constructor() {
    this.apiController = new ApiController();
  }

  start() {
    router.get("/products-test", this.apiController.productTest);
    router.get("/randoms", this.apiController.randomNumber);

    return router;
  }
}

module.exports = ApiRouter;
