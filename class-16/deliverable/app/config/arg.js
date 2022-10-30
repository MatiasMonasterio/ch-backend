const yargs = require("yargs/yargs");
const args = yargs(process.argv.slice(2));

const PORT = args.argv.PORT || 8080;
const MODE = args.argv.MODE === "CLUSTER" ? "CLUSTER" : "FORK";

module.exports = { PORT, MODE };
