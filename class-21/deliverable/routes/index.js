const { Router } = require("express");

const HomeRouter = require("./home");
const LoginRouter = require("./login");
const LogoutRouter = require("./logout");
const RegisterRouter = require("./register");
const InfoRouter = require("./info");
const ApiRouter = require("./api");

const router = Router();

class AppRouter {
  constructor() {
    this.homeRouter = new HomeRouter();
    this.loginRouter = new LoginRouter();
    this.logoutRouter = new LogoutRouter();
    this.registerRouter = new RegisterRouter();
    this.infoRouter = new InfoRouter();
    this.apiRouter = new ApiRouter();
  }

  start() {
    router.use("/", this.homeRouter.start());
    router.use("/login", this.loginRouter.start());
    router.use("/logout", this.logoutRouter.start());
    router.use("/register", this.registerRouter.start());
    router.use("/info", this.infoRouter.start());
    router.use("/api", this.apiRouter.start());

    return router;
  }
}

module.exports = AppRouter;
