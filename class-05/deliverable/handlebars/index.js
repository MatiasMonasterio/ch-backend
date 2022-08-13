const express = require("express");
const { engine } = require("express-handlebars");
const Container = require("./models/Container");

const app = express();
const productsContainer = new Container("products.txt");

app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/", (_req, res) => {
  res.render("index");
});

app.post("/products", async (req, res) => {
  const { name: title, price, image: thumbnail } = req.body;
  await productsContainer.save({ title, price, thumbnail });

  res.redirect(303, "/");
});

app.get("/products", async (req, res) => {
  const products = await productsContainer.getAll();

  res.render("products", {
    products: products,
    productsExist: !!products.lenght,
  });
});

const server = app.listen(3000, () => {
  console.log(`Server init on port ${3000}`);
});

server.on("error", (error) => {
  console.error(`Server Error: ${error}`);
});
