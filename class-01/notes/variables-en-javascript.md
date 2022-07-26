# Variables en Javascript

* Contendor dinámica que permite almacenar valores
* Existen diversos tipos que las variables pueden ser
* Su valor puede cambiar, permitiendo programas independientes del valor de estas variables

## Let y const
Dos formas de declarar variables en Javascript, introducidas en ES6 que limitan el ámbito de la variable al bloque donde este se declare (antes de ES6 no era así).


> 🚧 Antes de ES6 se utilizaba `var` para definir variables. Se recomineda fuertemente no usarlo y en su lugar usar `let` o `const`

> 🚧 Nota Personal <br/>
> Siempre utilizar `const` para asegurar que el valor de una variable no cambie a menos que sea realmente necesario


### Bloque
Se puede entender como "todo lo que queda entre llabes", ya sean funciones, bloques if, while, for, etc. 

### Let
Las variables declaradas con let en el ámbito (`scope`) global o de una funcion, esta pertenece y esta disponible en este ámbito.

### Const
Al igual que let, esta esta disponible en el `scope` en donde se defina. La diferencia es que `const` reestrigne la reasignacion de valores.

## Mutabilidad y const
Como se vio las variables definidas con `const`no se puede reasignar su valor, pero esto no implica que su valor pueda mutar. 
Los array y objectos con tipos de datos mutables, esto significa que sus valores internos pueden cambiar, sin importar que se definan con `const`.

```js
// valido! El objecto puede mutar
const user = { name: "Matias" };
user.name = "Maximiliano"; 

// no valido! Primitivo no mutable
const user = "Matias";
user = "Maximiliano";
```