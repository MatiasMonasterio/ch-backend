const yargs = require("yargs/yargs");
const args = yargs(process.argv.slice(2));

const PORT = args.argv.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_TIME_MINUTES = process.env.SESSION_TIME_MINUTES;
const MONGO_URL = process.env.MONGO_URL;

module.exports = { PORT, SESSION_SECRET, MONGO_URL, SESSION_TIME_MINUTES };
