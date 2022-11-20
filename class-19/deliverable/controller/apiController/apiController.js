const { productMock } = require("../../mocks");
const { fork } = require("child_process");

async function productTest(_req, res) {
  return res.json({ data: productMock.getMany(5) });
}

async function randomNumber(req, res) {
  const DEFAULT_CANT = 100000000;
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

  return res.json({ message: "run without child process" });
}

module.exports = {
  productTest,
  randomNumber,
};
