const { Router } = require("express");
const { fork } = require("child_process");

const { productMock } = require("../../mocks");

const router = Router();
const DEFAULT_CANT = 100000000;

router.get("/products-test", (_req, res) => {
  res.json({ data: productMock.getMany(5) });
});

router.get("/randoms", (req, res) => {
  const cant = parseInt(req.query?.cant) || DEFAULT_CANT;

  if (isNaN(cant)) {
    return res.status(400).json({ message: "Cant value is not valid" });
  }

  if (cant < 0) {
    return res.status(400).json({ message: "cant must be a positive number" });
  }

  // const forked = fork("./utilities/randomNumber.js");

  // forked.send(cant);

  // forked.on("message", (response) => {
  //   return res.json({ data: response });
  // });
  res.json({ message: "run without child process" });
});

module.exports = router;
