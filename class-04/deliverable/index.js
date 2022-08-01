const express = require("express");
const productRouter = require("./routes/products");

const PORT = 8080;
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use("/api/products", productRouter);

const server = app.listen(PORT, () => {
  console.log(`Server init on port ${PORT}`);
});

server.on("error", (error) => {
  console.error(`Server Error: ${error}`);
});
