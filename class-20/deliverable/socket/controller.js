const { Socket } = require("socket.io");
const { authorsDAO } = require("../daos");
const { productsRepository, messagesRepository } = require("../repository");
const { getCompression } = require("../utilities");
const logger = require("../logger");

const socketController = async (socket = new Socket(), io) => {
  socket.on("connected", async () => {
    try {
      const messages = await messagesRepository.getAll();
      const messagesNormalized = await messagesRepository.getAllNormalized();
      const compression = getCompression(messages, messagesNormalized);

      io.emit("init", {
        messages: messagesNormalized,
        compression: compression,
      });
    } catch (error) {
      logger.error(error);
    }
  });

  socket.on("add-product", async (newProduct) => {
    try {
      const product = await productsRepository.createOne(newProduct);
      io.emit("new-product", product);
    } catch (error) {
      logger.error(error);
    }
  });

  socket.on("add-message", async (newMessage) => {
    const { author, text } = newMessage;

    try {
      const authorExist = await authorsDAO.getOneByEmil(author.email);
      let currentAuthor = null;

      if (authorExist) currentAuthor = authorExist;
      else currentAuthor = await authorsDAO.createOne(author);

      const message = await messagesRepository.createOne({
        author: currentAuthor,
        text,
      });

      const messages = await messagesRepository.getAll();
      const messagesNormalized = await messagesRepository.getAllNormalized();
      const compression = getCompression(messages, messagesNormalized);

      io.emit("new-message", {
        message: message,
        compression: compression,
      });
    } catch (error) {
      logger.error(error);
    }
  });
};

module.exports = socketController;
