require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");

const session = require("./session");
const routes = require("./routes");
const { PORT } = require("./config/env");
const { socketController } = require("./socket");
const { updateSession } = require("./middlewares");
const { connectDatabase } = require("./utilities");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(session);
app.use(updateSession);
app.use("/", routes);

io.on("connection", (socket) => {
  socketController(socket, io);
});

connectDatabase()
  .then(async () => {
    await server.listen(PORT);
    console.log(`Server init on port ${PORT}`);
  })
  .catch((error) => {
    console.error(error);
  });
