const express = require("express");
const http = require("http");
const util = require("util");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");

const { productsDAO, messagesDAO, authorsDAO } = require("./daos");
const productMock = require("./mocks/productMock");

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
    // const products = await productsDAO.getAll();
    const messages = await messagesDAO.getAllMessages();
    const messagesNormalized = await messagesDAO.getAllMessagesNormalize();
    let compression = 0;

    if (messages.length) {
      compression =
        100 -
        (util.inspect(messagesNormalized, true).length * 100) /
          util.inspect(messages, true).length;
    }

    res.render("index", {
      products: [],
      productsExist: !![].lenght,
      compression: compression.toFixed(0),
    });
  } catch (error) {
    console.error(error);
    res.send("Error 500");
  }
});

app.get("/products-test", (req, res) => {
  res.render("products-test");
});

const apiRouter = express.Router();

apiRouter.get("/products-test", (req, res) => {
  res.json({ data: productMock.getMany(5) });
});

apiRouter.get("/messages", async (req, res) => {
  const messages = await messagesDAO.getAllMessages();
  const messagesNormalized = await messagesDAO.getAllMessagesNormalize();

  let compression = 0;

  if (messages.length) {
    compression =
      100 -
      (util.inspect(messagesNormalized, true).length * 100) /
        util.inspect(messages, true).length;
  }

  res.json({ data: messagesNormalized, compression: compression.toFixed(0) });
});

app.use("/api", apiRouter);

io.on("connection", (socket) => {
  socket.on("add-product", async (newProduct) => {
    try {
      await productsDAO.createOne({
        ...newProduct,
        price: parseInt(newProduct.price),
      });

      io.emit("new-product", newProduct);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("add-message", async (newMessage) => {
    const { author, text } = newMessage;

    try {
      const authorExist = await authorsDAO.findByEmail(author.email);
      let currentAuthor = null;

      if (authorExist) currentAuthor = authorExist;
      else currentAuthor = await authorsDAO.createOne(author);

      const message = await messagesDAO.createOne({
        author: currentAuthor,
        text,
      });

      const messages = await messagesDAO.getAllMessages();
      const messagesNormalized = await messagesDAO.getAllMessagesNormalize();

      let compression = 0;

      if (messages.length) {
        compression =
          100 -
          (util.inspect(messagesNormalized, true).length * 100) /
            util.inspect(messages, true).length;
      }

      io.emit("new-message", {
        ...message,
        author: currentAuthor,
        compression: compression.toFixed(0),
      });
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(3000, () => {
  console.log(`Server init on port ${3000}`);
});
