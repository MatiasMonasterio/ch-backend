const sqliteClient = require("../index");

sqliteClient.schema
  .createTable("messages", (table) => {
    table.increments();
    table.string("email");
    table.string("date");
    table.string("message");
  })
  .then(() => {
    console.log("table created");
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })
  .finally(() => {
    sqliteClient.destroy();
  });
