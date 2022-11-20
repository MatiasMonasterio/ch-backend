const yargs = require("yargs/yargs");
const args = yargs(process.argv.slice(2));

const PORT = process.env.PORT || 8080; // TO DEPLOY ON HEROKU
const MODE = args.argv.MODE === "CLUSTER" ? "CLUSTER" : "FORK";

module.exports = { PORT, MODE };
