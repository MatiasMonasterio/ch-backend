const { Router } = require("express");

const homeRouter = require("./home");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const registerRouter = require("./register");
const infoRouter = require("./info");
const apiRouter = require("./api");

const router = Router();

router.use("/", homeRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/register", registerRouter);
router.use("/info", infoRouter);
router.use("/api", apiRouter);

module.exports = router;
