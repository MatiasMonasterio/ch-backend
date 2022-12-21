const run = require("../utilities/autocannon");
const { PORT } = require("../config/arg");

run(`http://localhost:${PORT}/info`);
