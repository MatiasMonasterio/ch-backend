process.on("message", (cant) => {
  const randomNumberObject = {};

  for (let i = 0; i < cant; i++) {
    const randonNumber = Math.floor(Math.random() * 1000);

    randomNumberObject[randonNumber] = randomNumberObject[randonNumber]
      ? randomNumberObject[randonNumber] + 1
      : 1;
  }

  process.send(randomNumberObject);
});
