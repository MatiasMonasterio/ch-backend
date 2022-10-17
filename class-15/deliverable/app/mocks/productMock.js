const { faker } = require("@faker-js/faker");

module.exports = {
  getOne: () => ({
    id: faker.database.mongodbObjectId(),
    title: faker.name.jobType(),
    price: faker.random.numeric(3),
    thumbnail: faker.image.food(),
  }),

  getMany: (length) => {
    const productsMock = [];

    for (let i = 0; i < length; i++) {
      productsMock.push({
        id: faker.database.mongodbObjectId(),
        title: faker.name.jobType(),
        price: faker.random.numeric(3),
        thumbnail: faker.image.food(1000, 1000, true),
      });
    }

    return productsMock;
  },
};
