# 👾 Классы
Классы появились в JS со стандартом ES6, заменив собой функции-конструкторы и установку методов через `.prototype`.

::::::::::::grid align-start
::::::adm warn
##### Было — функция-конструктор
```js
/** @class */
var Base = (function () {
    function Base() {
        this.baseProp = '123';
    }
    return Base;
}());
```
::::::
:::::::::
::::::adm info
##### Стало — конструктор класса
:::code
```js
class Base {
    baseProp = '123'
}
```
> ##### Неизменно одно:
```ts
typeof Base === 'function'
▶️ true
```
> Класс — это функция **🦾** (функция-конструктор)
:::

::::::
:::::::::
::::::::::::

# Под капотом
:::code
> Итак, каждый базовый класс является экземпляром `Function`:
```ts
assert.equal(
  Reflect.getPrototypeOf(A),
  Function.prototype
)
▶️ true
```
> В то же время, прототипами дочерних классов являются их родители:
```ts
class B extends A {}

assert.equal(
  Reflect.getPrototypeOf(B),
  A
)
▶️ true
```
:::

## Связь двух объектов
:::code
> Когда код класса выполняется, то фактически создается 2 связанных объекта:
```ts
class Base {
  #data
  constructor(data) {
    this.#data = data
  }
  print() {
    return `${this.#data}`;
  }
  static printAll(instances) {
    return instances.map(i => i.#data);
  }
}
```
> Первый объект создастся с идентификатором `Base` и будет иметь 4 свойства:
```ts
Reflect.ownKeys(Base)
▶️  ['length', 'name', 'prototype', 'printAll']

Base.length // Количество параметров конструктора
▶️ 1
Base.name // Имя класса
▶️ 'Base'
```
> `.printAll` -- это статический метод, а вот св-во `.prototype` как раз будет указывать на второй создаваемый объект:
```ts
Reflect.ownKeys(Base.prototype)
▶️ ['constructor', 'print']
```
> `constructor` — ссылка на метод-конструктор.
>
> Можно еще отметить, что прототип класса через **constructor** ссылается на сам класс:
```ts
Base.prototype.constructor === Base
▶️ true
```
> Из этого можно сделать вывод, что класс — это конструктор.
:::

## Экземпляры
:::def
Экземпляр класса — это объект, прототипом которого является класс.
:::

:::code
> Экземпляры создаются при помощи синтаксиса `new ClassIdentifier()`.
> Классы автоматически устанавливают цепочку прототипов для своих экземпляров.
```ts
const baseInstance = new Base('something')
```
> Все экземпляры класса `Base` будут иметь св-во `prototype`, ссылающееся на `Base.prototype`
```ts
assert.equal(
  Reflect.getPrototypeOf(baseInstance),
  Base.prototype
)
▶️ true
```
> Это показывает, как экземпляры классов получают своих методы и свойства — наследуют их от объекта **Base.prototype**
:::

## ⛓️ 2 цепочки
> Важно понимать, что синтаксис классов создает две отдельные цепочки прототипов:
> - Цепь прототипов экземпляра
> - Статическая цепь

:::grid
```ts
class ClassA {
  static staticMthdA() {}
  constructor(instPropA) {
    this.instPropA = instPropA;
  }
  prototypeMthdA() {}
}
class ClassB extends ClassA {
  static staticMthdB() {}
  constructor(instPropA, instPropB) {
    super(instPropA);
    this.instPropB = instPropB;
  }
  prototypeMthdB() {}
}
const instB = new ClassB(0, 1);
```

:::

# constructor
> специальный метод класса, который будет выполнен при создании экземпляра, раньше всех других методов.

# Наследование
> Inheritance
:::def
Способность класса расширять другой уже существующий класс
:::

::::::grid
:::code
```js
class Base {
	baseProp = 'from base'
	
	baseMethod() {
		return this.baseProp
	}
}

class Derived extends Base {}

const d = new Derived();
console.log(d.baseMethod())
> 'from base'
```
:::
:::adm
- В JS класс может расширять только один класс (любой объект имеет единственный `[[Prototype]]`)
-
:::
::::::

- В конструкторе ключевое слово `super` должно использоваться раньше, чем ключевое слово `this`.
- Вызов `super()` вызывает конструктор родительского класса. Если вы хотите передать какие-то аргументы из конструктора класса в конструктор родительского класса, то нужно вызывать функцию следующим образом: `super(arguments)`.
- Если у родительского класса есть метод `X` (даже статический), для его вызова в дочернем классе можно использовать `super.X()`.

:::code
```js
class Polygon {
  constructor(height, width) {
    this.name = 'Многоугольник';
    this.height = height;
    this.width = width;
  }

  getHelloPhrase() {
    return `Привет, я — ${this.name}`;
  }
}

class Square extends Polygon {
  constructor(length) {
```
> Здесь вызывается конструктор родительского класса со значением length, передаваемым для переменных width и height класса Polygon:
```ts

    super(length, length);
```
> В производных классах перед тем, как использовать 'this', нужно вызвать функцию `super()`, иначе это приведёт к ошибке.
```ts
    this.name = 'Квадрат';
    this.length = length;
  }

  getCustomHelloPhrase() {
```
> Получение доступа к родительскому методу с помощью синтаксиса `super.method()`:
```ts
    const polygonPhrase = super.getHelloPhrase();
    return `${polygonPhrase} с длиной стороны ${this.length}`;
  }

  get area() {
    return this.height * this.width;
  }
}

const mySquare = new Square(10);
console.log(mySquare.area)
console.log(mySquare.getHelloPhrase())
console.log(mySquare.getCustomHelloPhrase())
```
:::

## `static`
> Ключевое слово `static` используется в классах для объявления статических методов и свойств.

:::def
Статический — означает, что метод или свойство принадлежит классу, но не его экземплярам.
:::


#### Подробное объяснение
Статические методы можно вызвать в другом статическом методе, используя ключевое слово `this`, однако это не работает для нестатических методов. Нестатические методы не могут напрямую обращаться к статическим методам, используя ключевое слово `this`.

##### Вызов статических методов из статического метода
Для вызова статического метода из другого статического метода можно использовать ключевое слово `this` следующим образом:
```js
class Repo {
  static getName() {
    return "Repo name is modern-js-cheatsheet";
  }

  static modifyName(){
    return `${this.getName()}-added-this`;
  }
}

console.log(Repo.modifyName()); // Repo name is modern-js-cheatsheet-added-this
```

##### Вызов статических методов из нестатических методов
Нестатические методы могут вызывать статические двумя способами:

1. Используя имя класса.

Чтобы получить доступ к статическому методы из нестатического, используем имя класса и вызываем статический метод как обычное свойство, например, `ClassName.StaticMethodName`:
```js
class Repo {
  static getName() {
    return "Repo name is modern-js-cheatsheet"
  }

  useName(){
    return `${Repo.getName()} and it contains some really important stuff`;
  }
}

// Нужно создать экземпляр класса для использования нестатических методов.
let r = new Repo();
console.log(r.useName()); // Repo name is modern-js-cheatsheet and it contains some really important stuff
```

2. Используя конструктор.

Статические методы можно вызвать как свойства объекта-конструктора класса.
```js
class Repo {
  static getName() {
    return "Repo name is modern-js-cheatsheet"
  }

useName(){
// Вызывает статический метод как обычное свойство конструктора.
  return `${this.constructor.getName()} and it contains some really important stuff`;
  }
}

// Нужно создать экземпляр класса для использования нестатических функций.
let r = new Repo();
console.log(r.useName()); // Repo name is modern-js-cheatsheet and it contains some really important stuff
```

# ⛓️
- https://exploringjs.com/deep-js/ch_creating-class-instances.html