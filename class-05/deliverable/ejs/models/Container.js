const fs = require("fs").promises;

module.exports = class Container {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async _getFileData() {
    try {
      const content = await fs.readFile(`./${this.fileName}`, "utf-8");
      const elements = JSON.parse(content);

      if (elements.length === 0) throw new Error("empty file");
      return content;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async save(newElement) {
    try {
      const content = await this._getFileData();
      const elements = [];

      if (content) {
        elements.push(...JSON.parse(content));
        const { id } = elements[elements.length - 1];

        elements.push({ ...newElement, id: id + 1 });
      } else {
        elements.push({ ...newElement, id: 1 });
      }

      await fs.writeFile(this.fileName, JSON.stringify(elements));

      return elements[elements.length - 1].id;
    } catch (error) {
      // console.error(error);
      return 0;
    }
  }

  async update(id, product) {
    const content = await this._getFileData();

    if (content) {
      const elements = JSON.parse(content);
      const elementIndex = elements.findIndex((element) => element.id === id);

      if (elementIndex === -1) return null;

      elements[elementIndex] = { ...elements[elementIndex], ...product };
      await fs.writeFile(this.fileName, JSON.stringify(elements));

      return elements[elementIndex].id;
    } else {
      throw new Error("file no exist");
    }
  }

  async getById(id) {
    try {
      const content = await this._getFileData();

      if (content) {
        const elements = JSON.parse(content);

        const element = elements.find((element) => element.id === id);

        if (element) return element;
        else throw new Error("not found");
      } else {
        throw new Error("file no exist");
      }
    } catch (error) {
      // console.error(error);
      return null;
    }
  }

  async getAll() {
    try {
      const content = await this._getFileData();

      if (content) return JSON.parse(content);
      else throw new Error("file no exist");
    } catch (error) {
      // console.error(error);
      return [];
    }
  }

  async deleteById(id) {
    try {
      const content = await this._getFileData();

      if (content) {
        const elements = JSON.parse(content);
        const elementIndex = elements.findIndex((element) => element.id === id);

        if (elementIndex !== -1) {
          elements.splice(elementIndex, 1);
          await fs.writeFile(this.fileName, JSON.stringify(elements));
        }
      } else {
        throw new Error("file no exist");
      }
    } catch (error) {
      // console.error(error);
    }
  }

  async deleteAll() {
    await fs.writeFile(this.fileName, JSON.stringify([]));
  }
};
