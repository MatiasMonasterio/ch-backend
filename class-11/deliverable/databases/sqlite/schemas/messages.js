const sqliteClient = require("../index");

(async function () {
  try {
    await sqliteClient.schema.createTable("users", (table) => {
      table.primary(["id"]);
      table.increments("id");
      table.string("name");
      table.string("lastname");
      table.string("email");
      table.string("age");
      table.string("alias");
      table.string("avatar");
    });

    await sqliteClient.schema.createTable("messages", (table) => {
      table.integer("author").unsigned().notNullable();
      table.increments();
      table.string("text");
      table.timestamp("created_at").defaultTo(new Date());
      table.timestamp("updated_at").defaultTo(new Date());

      table.foreign("author").references("id").inTable("users");
    });
  } catch (error) {
    console.error(error);
  } finally {
    sqliteClient.destroy();
  }
})();
