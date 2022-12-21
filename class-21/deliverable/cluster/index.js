const cluster = require("cluster");
const os = require("os");

const { MODE } = require("../config/arg");

const clusterInit = (callback) => {
  if (MODE === "CLUSTER" && cluster.isMaster) {
    const totalCPUs = os.cpus().length;
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    os.cpus().forEach(() => {
      cluster.fork();
    });

    cluster.on("exit", (worker, _code, _signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });

    return;
  }

  callback();
};

module.exports = clusterInit;
