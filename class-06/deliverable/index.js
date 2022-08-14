const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
const Container = require("./models/Container");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productsContainer = new Container("products.txt");
const messageContainer = new Container("messages.txt");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", async (_req, res) => {
  const products = await productsContainer.getAll();
  const messages = await messageContainer.getAll();

  res.render("index", {
    products: products,
    productsExist: !!products.lenght,
    messages: messages,
  });
});

io.on("connection", (socket) => {
  socket.on("add-product", async (newProduct) => {
    await productsContainer.save(newProduct);
    io.emit("new-product", newProduct);
  });

  socket.on("add-message", async (newMessage) => {
    const message = { ...newMessage, date: new Date() };

    await messageContainer.save(message);
    io.emit("new-message", message);
  });
});

server.listen(3000, () => {
  console.log(`Server init on port ${3000}`);
});
