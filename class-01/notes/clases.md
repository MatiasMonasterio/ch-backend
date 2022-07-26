# Clases

## Características

- Se declaran atributos y metodos, tanto de instancia como de clase.
- Posee el metodo constructor donde se declaran los atributos usados con la palabra reservada this.
- El constructor puede usear la palabra reservada super para llamar al contructor de una superclase
- Las clases son solo azucar sintáxtica, es decir, no son una nueva funcionaldiad, solo una nueva manera de escribir lo que antes ya se podiar pero de manera menos convencional.

```js
class Client {
  static saludoCorto = "hi";

  constructor(name, date, address) {
    this.name = name;
    this.date = date;
    this.address = address;
  }

  soludoCompleto() {
    return `buenassss, soy ${this.name}`;
  }

  saludoEstático() {
    return Client.saludoCorto;
  }
}
```

## Operador new
Permite crear intancias de un tipo de objecto definido por le usuario, mediante una clase.

* Crea un objecto vacio
* Ejecuta el constructor de una clase en el contexto del objecto creado.
* Retorna el objecto.