const yargs = require("yargs/yargs");
const args = yargs(process.argv.slice(2));

const PORT = args.argv.PORT || 8080;
const MODE = args.argv.MODE === "FORK" ? "FORK" : "CLUSTER";
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_TIME_MINUTES = process.env.SESSION_TIME_MINUTES;
const MONGO_URL = process.env.MONGO_URL;
const LOGGER_CATEGORY = process.env.LOGGER_CATEGORY;

module.exports = {
  PORT,
  MODE,
  SESSION_SECRET,
  MONGO_URL,
  SESSION_TIME_MINUTES,
  LOGGER_CATEGORY,
};
