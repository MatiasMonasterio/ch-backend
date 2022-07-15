/*
1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
nombre: String
apellido: String
libros: Object[]
mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

3) Hacer que Usuario cuente con los siguientes métodos:

getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.

4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.
*/

class User {
  name = "";
  surname = "";
  books = [];
  pets = [];

  constructor(name, surname, books, pets) {
    this.name = name;
    this.surname = surname;
    this.books.push(...books);
    this.pets.push(...pets);
  }

  getFullName() {
    return `${this.name} ${this.surname}`;
  }

  addPet(newPet) {
    this.pets.push(newPet);
  }

  countPets() {
    return this.pets.length;
  }

  addBook(name, author) {
    this.books.push({ name, author });
  }

  getBooksNames() {
    return this.books.map((book) => book.name);
  }
}

const book1 = { name: "book 1", author: "author 1" };
const me = new User("Matias", "Monasterio", [book1], ["dog", "fish"]);

me.addPet("cat");
me.addBook("book 2", "author 2");

const myFullname = me.getFullName();
const myCountPets = me.countPets();
const myBooks = me.getBooksNames();

console.log(myFullname); // expect Matias Monasterio
console.log(myCountPets); // expect 3
console.log(myBooks); // expect ["book 1", "book 2"]
