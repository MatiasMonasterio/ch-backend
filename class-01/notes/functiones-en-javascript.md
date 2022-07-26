# Funciones en Javascript

## Declaración de una función

```js
function name([param[,param[, ...param]]]) {
    // intructions
}
```

- name: Nombre de la funcion, no es obligatoria. En caso de no definirlo la funcion se denominca `funcion anonima`.
- param: Nombre de un argumento que se pasara a la funcion. El limite es de 255 argumentos.
- intructions: Codigo definido en la funcion.

## Funcion Anónima

- Function definida sin nombre
- Se almacena en memoria, pero en tiempo de ejecucion no se crea automaticamente una referencia a la misma
- Hay varios escenarios donde las funciones anonimas son muy convenientes

```js
// asignacion de funcion anonima a una variable
const foo = function () {
  /* */
};

// Devolucion de funcion anónima desde otra funcion
function sayHi() {
  return function () {
    return "Hi";
  };
}

// Invocacion inmediata de funcion anónima
(function () {
  const name = "Matias";
})();
```

## Funciones IIFE (Immediately Invoked Function Expressions)

Functiones que se ejecturan tan pronto se definen. Se component por

- Function anónima con alcance léxico encerrado por el `Operador de Agrupacion()`
- Expresion de funcion cuya ejecucion es inmediata ()

```js
(function () {
  const name = "Matias";
})();
```

## Scope

- Ambito o alcance actual de ejecucion
- En el los valores y expresiones son "visibles" o pueden ser referenciados (?)
- Las funciones sirven como cierre de un contexto, por lo que crea un ambito o scope
- Los scopes se pueden superponer en jerarquias, po rlo que el scope secundario o hijo tiene acceso al ambito del primeario o padre, pero no al revés.

## Clouse

- Function que guarda referencias del estado adyacente (ámbito léxico)
- Permite acceder al ámbito de una funcion exterior desde una funcion interior.
- En Javascript, las clausuras se crean cada vez que una funcion es creada.

Una clousure es un tipo especial de objecto que combina funciones y el entorno en que se creo la misma.

```js
function sayMyName(name) {
  const expresion = "!!!";

  return function () {
    console.log(`${name}${expresion}`);
  };
}

const sayMyNameFn = sayMyName("Heisenberg");
sayMyNameFn();
```


## Template String (plantillas de texto)
Cadenas literales de texto incrustadas en el codigo fuente que permite la interpolacion mediante expresiones. Dentro de la interpolacion se puede ejecutar codigo. Soporta texto multilínea manteiendiendo formato, saltos de lineas, tabulaciones.

