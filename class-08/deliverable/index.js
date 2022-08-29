const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
const { mariadb, sqlite } = require("./databases");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", async (_req, res) => {
  try {
    const products = await mariadb.from("products").select("*");
    const messages = await sqlite.from("messages").select("*");

    res.render("index", {
      products: products,
      productsExist: !!products.lenght,
      messages: messages,
    });
  } catch (error) {
    console.error(error);
    res.send("Error 500");
  }
});

io.on("connection", (socket) => {
  socket.on("add-product", async (newProduct) => {
    try {
      await mariadb
        .from("products")
        .insert({ ...newProduct, price: parseInt(newProduct.price) });

      io.emit("new-product", newProduct);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("add-message", async (newMessage) => {
    const message = { ...newMessage, date: new Date() };

    try {
      await sqlite.from("messages").insert(message);
      io.emit("new-message", message);
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(3000, () => {
  console.log(`Server init on port ${3000}`);
});
