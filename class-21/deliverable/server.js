const path = require("path");

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env." + process.env.NODE_ENV),
});

const express = require("express");
const http = require("http");
const compression = require("compression");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");

const AppRouter = require("./routes");
const session = require("./session");
const passport = require("./passport");
const cluster = require("./cluster");
const logger = require("./logger");
const { PORT, MODE } = require("./config/arg");
const { socketController } = require("./socket");
const { updateSession, loggerRouterRequest } = require("./middlewares");
const { connectDatabase } = require("./utilities");

cluster(() => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const router = new AppRouter();

  app.engine("hbs", engine({ extname: ".hbs" }));
  app.set("view engine", "hbs");
  app.set("views", "./views");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(__dirname + "/public"));
  app.use(session);
  app.use(compression());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(updateSession);
  app.use(loggerRouterRequest);
  app.use("/", router.start());

  app.all("*", (req, res) => {
    logger.warn(req.originalUrl);
    logger.warn(req.method);
    res.status(404).send("404 Not Found");
  });

  io.on("connection", (socket) => {
    socketController(socket, io);
  });

  connectDatabase()
    .then(async () => {
      await server.listen(PORT);
      console.log(`Server init on http://localhost:${PORT}/`);
      console.log(`Server mode ${MODE}`);
    })
    .catch((error) => {
      console.error(error);
    });
});
