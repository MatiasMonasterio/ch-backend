/*
Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con
el que va a trabajar e implemente los siguientes métodos:

* save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
* getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
* getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
* deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
* deleteAll(): void - Elimina todos los objetos presentes en el archivo.

- El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del
último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
- Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
- Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await
y manejo de errores.
- Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
- Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para
verificar el correcto funcionamiento del módulo construído. 
- El formato de cada producto será : 
{
  title: (nombre del producto),
  price: (precio),
  thumbnail: (url de la foto del producto)
}

*/

const fs = require("fs").promises;

class Container {
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
}

const product01 = {
  title: "product 01",
  price: "1",
  thumbnail: "some url",
};

const product02 = {
  title: "product 02",
  price: "2",
  thumbnail: "some url 2",
};

const product03 = {
  title: "product 03",
  price: "3",
  thumbnail: "some url 3",
};

const products = new Container("products.txt");

(async function () {
  const productId1 = await products.save(product01);
  const productId2 = await products.save(product02);
  const productId3 = await products.save(product03);
  console.log(productId1);
  console.log(productId2);
  console.log(productId3);

  const productValid = await products.getById(2);
  const productInvalid = await products.getById(10000);
  console.log(productValid);
  console.log(productInvalid);

  const allProducts = await products.getAll();
  console.log(allProducts);

  await products.deleteById(1);
  const allProductsUpdated = await products.getAll();
  console.log(allProductsUpdated);

  await products.deleteAll();
  const productsEmpty = await products.getAll();
  console.log(productsEmpty);
})();
