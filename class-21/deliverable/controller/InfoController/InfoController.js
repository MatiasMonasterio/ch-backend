const os = require("os");

class InfoController {
  renderPage(_req, res) {
    console.log("ejecutando info view");

    res.render("info", {
      arguments: process.argv.slice(2),
      path: process.execPath,
      platform: process.platform,
      nodeVersion: process.version,
      processId: process.pid,
      projectFolder: process.cwd(),
      memoryRSS: process.memoryUsage().rss,
      processNumber: os.cpus().length,
    });
  }
}

module.exports = InfoController;
