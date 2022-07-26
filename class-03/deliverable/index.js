const express = require("express");
const Container = require("./models/Container");

const app = express();
const PORT = 8080;
const FILE_NAME = "products.txt";

app.get("/products", async (req, res) => {
  const products = new Container(FILE_NAME);
  const allProducts = await products.getAll();

  res.send({ data: allProducts });
});

app.get("/random-product", async (req, res) => {
  const products = new Container(FILE_NAME);
  const allProducts = await products.getAll();

  const randomProduct =
    allProducts[Math.floor(Math.random() * allProducts.length)];

  res.send({ data: randomProduct });
});

app.listen(PORT, () => {
  console.log(`Server init on port ${PORT}`);
});
