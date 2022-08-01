const express = require("express");
const Container = require("../models/Container");

const router = express.Router();
const products = new Container("products.txt");

router.get("/", async (req, res) => {
  const allProducts = await products.getAll();
  res.json({ data: allProducts });
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await products.getById(+productId);

  product
    ? res.json({ data: product })
    : res.status(404).json({ error: "product not found" });
});

router.post("/", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const newProductId = await products.save({ title, price, thumbnail });

  res.json({ data: { id: newProductId, title, price, thumbnail } });
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productUpdatedId = await products.update(productId, req.body);

  productUpdatedId
    ? res.send()
    : res.status(404).json({ error: "product not found" });
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  await products.deleteById(+productId);

  res.send();
});

module.exports = router;
