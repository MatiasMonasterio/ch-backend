const { Router } = require("express");

const router = Router();

router.get("/", async (_req, res) => {
  res.render("info", {
    arguments: process.argv.slice(2),
    path: process.execPath,
    platform: process.platform,
    nodeVersion: process.version,
    processId: process.pid,
    projectFolder: process.cwd(),
    memoryRSS: process.memoryUsage().rss,
  });
});

module.exports = router;
