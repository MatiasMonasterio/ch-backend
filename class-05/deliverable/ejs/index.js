const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const Container = require("./models/Container");

const app = express();
const productsContainer = new Container("products.txt");

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "./layouts/main");

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
