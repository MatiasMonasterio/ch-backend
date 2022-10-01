const mysqlClient = require("../index");

mysqlClient.schema
  .createTable("products", (table) => {
    table.increments();
    table.string("title");
    table.decimal("price", 10, 2);
    table.string("thumbnail");
  })
  .then(() => {
    console.log("table created");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    mysqlClient.destroy();
  });
