# Протоколы перебора
## Перебираемый
> Iterable — интерфейс, который должны реализовывать объекты, доступные для перебора (например, в `for..of`)

Данный контракт заключается в методе @@iterator, то есть объект должен иметь свойство  `[Symbol.iterator]` — функция без аргументов, которая возвращает итератор.

## Перебиратель
> Iterator — интерфейс стандартного способа получения последовательности значений
:::code
> Объект реализует Итератор, если имеет метод `next()` — функцию без аргумментов, возвращающую объект с 2 свойствами:
```ts
interface IteratorNextYield {
  done?: boolean
  value: unknown
}
```
> - `.done === true`, если итератор достиг конца последовательности, в этом случае `.value` содержит возвращаемое значение итератора.
> - `.down === false`, если итератор имеет следующее значение, то же самое, если свойство `done === undefined`
> - `.value` — любое значение. Может быть `undefined`, если `.done === true`
    :::

> `String`, `Array`, `TypedArray`, `Map` и `Set` итерируемы, так как их прототипы содержат **@@iterator** метод, а `Object` нет, так как прототип `Object` не содержит свойства `[Symbol.iterator]`

# Generators
:::code
> Генераторы — это функции, выполнение которых **может быть прервано, а затем продолжено**.
```js
// Функции-генераторы объявляются со звездочкой
function* downToOne(n) {
  for (let i = n; i > 0; --i) {
    yield i;
  }
}

console.log([...downToOne(5)])
// -> [ 5, 4, 3, 2, 1 ]
```
> Контекст выполнения генераторов сохраняется для всех последующих вызовов %%(привязки переменных сохраняются)%%.
:::

:::def
Генераторы одновременно являются и перебираемыми, и перебирателями.
:::

:::code
> Генераторы возвращают итерируемый объект.
```js
function * idMaker() {
  var index = 0;
  while (index < 2) {
    yield index;
    index = index + 1;
  }
}

var gen = idMaker();

gen.next().value; // -> 0
gen.next().value; // -> 1
gen.next().value; // -> undefined
```
> Когда вызывается метод `next()`, иттератор выполняется до первого выражения `yield`, которое указывает значение, которое должно быть возвращено на текущей итерации.
:::

:::adm info
##### **↩️**  `return`
Когда в генераторе вызывается выражение `return`, он будет помечать генератор как выполненный и возвращать значение из выражения
> Дальнейшие вызовы `next()` не будут возвращать никаких новых значений.
:::
:::code
```js
function* yieldAndReturn() {
  yield 'Y';
  return 'R';
  yield 'unreachable';
}

const gen = yieldAndReturn()
gen.next(); 
// -> { value: "Y", done: false }
gen.next(); 
// -> { value: "R", done: true }
gen.next(); 
// -> { value: undefined, done: true }
```
> Пример возврата из генератора.
:::

## Делегация*

:::code
> Выражение `yield*` позволяет генератору вызывать другую функцию-генератор во время итерации.
```ts
function* inner () {
  yield 2
  yield 3
}

function* main() {
  yield 1
  yield *inner()
}

for (const n of main()) {
  console.log(n)
}

```
> Пример использования yield *
:::

# Синхронность (нет)

# Асинхронные генераторы
> Позволяют перебирать данные, поступающие асинхронно.

::::::adm primary
### Объявление
:::code
> Указываем `async`
```ts
async function * assGen() {
  yield 1
  await new Promise((resolve) => {
	  setTimeout(resolve, 500))
  }
  yield 2
}
```
> Теперь внутри можно использовать `await`
```ts
for await (const value of assGen()) {  
  console.log(value)
}
```
> Для перебора можно использовать синтаксис `for await..of`
:::

::::::

# Array
## sort
:::code
> `Array.prototype.sort` принимает функцию, которая принимает 2 аргумента (элементы массива) и возвращает целое число:
```ts
const someArray = [1, 44, 91, 12]
someArray.sort(
	(
		a: typeof someArray[number], 
		b: typeof someArray[number]
	) => number
)
```
> Если возвращаемое число:
> - `< 0` -- a встанет перед b
> - `> 0` -- b встанет перед a
> - `= 0` -- a и b не изменят своих индексов относительно друг друга
```ts
function compare(a, b) {
  if (a меньше b по некоторому критерию сортировки) {
    return -1;
  }
  if (a больше b по некоторому критерию сортировки) {
    return 1;
  }
  // a должно быть равным b
  return 0;
}

```
:::



## snipets
#### пересечения
```js
const intersect = (a, b) => a.filter((i) => b.includes(i))

intersect([1, 2, 3], [1, 2, 4]) // [1, 2]
```

#### количество вхождений элемента
```js
const getCountOccur = (arr, v) =>
  arr.reduce((a, c) => (c === v ? a + 1 : a), 0)

getCountOccur([1, 1, 2, 1, 2, 3], 1) // 3
```

#### количество вхождений каждого элемента
```js
const getOccurCount = (arr) =>
  arr.reduce((a, k) => {
    a[k] = a[k] ? a[k] + 1 : 1
    return a
  }, {})

getOccurCount(['a', 'b', 'c', 'b', 'b', 'a'])
// { a: 2, b: 3, c: 1 }
```

#### разделение на равные части
```js
// n - количество элементов каждой части
const chunk = (arr, n) => (arr.length > n ? [arr, arr.splice(n)] : arr)

chunk([1, 2, 3, 4, 5, 6, 7], 4) // [ [1, 2, 3, 4], [5, 6, 7] ]

// n - количество частей, на которые делится массив
const chunk = (arr, n) => {
  const size = ~~(arr.length / n)
  return Array.from({ length: n }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

chunk([1, 2, 3, 4, 5, 6, 7], 4) // [ [1, 2], [3, 4], [5, 6], [7] ]
```

#### создание иттерируемого объекта
```js
const makeIterable = (obj) => {
  Object.defineProperties(obj, {
    length: {
      value: Object.keys(obj).length
    },

    [Symbol.iterator]: {
      value: function* () {
        for (const i in this) {
          yield this[i]
        }
      }
    }
  })

  return obj
}

const iterableObj = makeIterable({
  name: 'Jane',
  age: 23
})

for (const v of iterableObj) console.log(v) // Jane 23
console.log(...iterableObj) // Jane 23
```

### Сортировка
#### пузырьковая
```javascript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const less = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = less
      }
    }
  }

  return arr
}

const arr = [5, 3, 2, 4, 1]
console.log(bubbleSort(arr)) // [1, 2, 3, 4, 5]
```

#### вставкой
```javascript
const insertionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) arr.splice(j, 0, arr.splice(i, 1)[0])
    }
  }
  return arr
}

console.log(insertionSort(arr))
```

#### быстрая
```javascript
const quickSort = (arr) => {
  if (arr.length < 2) return arr

  let n = arr[~~((arr.length - 1) / 2)]

  let less = []
  let great = []

  for (const i of arr) {
    if (i < n) {
      less.push(i)
    } else if (i > n) {
      great.push(i)
    }
  }

  less = quickSort(less)
  great = quickSort(great)

  return [...less, n, ...great]
}

console.log(quickSort(arr))
```

# ⛓️
- [Итераторы и генераторы — MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Iterators_and_Generators#%D0%93%D0%B5%D0%BD%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B)
- [Generators as threads](https://2ality.com/2013/06/iterators-generators.html#generators-as-threads)
- [TS Deep Dive: Iterators](https://basarat.gitbook.io/typescript/future-javascript/iterators)