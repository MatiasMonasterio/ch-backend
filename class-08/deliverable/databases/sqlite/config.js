module.exports = {
  client: "sqlite3",
  connection: {
    filename: `${__dirname}/websocker.sqlite`,
  },
  useNullAsDefault: true,
};
