:::::::::header
::::::
# Цикл событий
> Event Loop
:::adm
> [Cпецификация](https://262.ecma-international.org/12.0/#sec-jobs) ECMAScript не использует термин "Event Loop", вместо этого, она оперирует понятиями "Job" и "Queue", оставляя их реализацию на среду выполнения ECMAScript.

А вот как раз *ECMAScript host environments*, такие как  браузер и нода, обеспечивают управление задачами и очередями через разные реализации паттерна Цикл событий.
:::
::::::

:::::::::
:::::::::grid align-start
::::::
:::adm warn
### JS однопоточный
- Только одна задача может выполняться в один момент времени
- Если выполнение задачи началось, оно должно завершиться, прежде, чем начнется выполнение какой-либо другой задачи
  :::
##### Базовый алгоритм Цикла событий в браузерах и ноде:
`стек вызовов -> одна макрозадача -> все микрозадачи (проверяет не появились ли новые и выполняет их, если да) -> стек вызовов`
::::::

::::::

::::::
:::::::::

## 🥞 Callstack
> Стопка вызовов

::::::grid

Callstack - это стек, *предоставляемый V8*, хранящий *контекст выполнения* функций, вызванных в процессе исполнения кода.
Когда происходит вызов функции движок создает для нее контекст выполнения и помещает его в колстек.
::::::

## 🕺 Очередь задач 🚶‍♂️👩‍🦯👨‍🦼
> Tasks queue также называется очередью **макрозадач**.

> Сюда помещаются колбеки `setTimeout()`, `setInterval()`, `setImmediate()`, а также различные операции ввода-вывода

Когда [колстек](#стопка-вызовов) освобождается, движок берет первую задачу из очереди задач (*tasks queue*) и вызывает связанную с ней функцию, с записанными в задаче аргументами. Вызов функции создает новый *контекст выполнения*, который помещается на вершину *стека вызовов*.


## 🚑️ Очередь микрозадач 🚒
> Microtasks queue

::::::grid align-start
:::adm info
##### Сюда помещаются:
- колбеки промисов,
- queueMicrotask,
- MutationObserver - браузер
- queueMicrotask - вокеры
  :::
  :::adm warn
> исполняются **ВСЕ** промисы, и нужно об этом помнить, так как по факту, так можно застопорить процесс выполнения и очень не скоро приступить к макротаскам
:::
::::::

## Асинхронность 🪐
Суть 🪐 в том, что функции в 🐸 -- это объекты первого класса. Будучи переданными в аргументах %%это и называется ==callback==%%,

# Браузер
!!! abstract обработчики событий и колбеки
При наступлении события или по окончанию работы функции Web API, попадают в очередь - **Task Queue**. Откуда их извлекает и передаёт на исполнение Event Loop.
!!!

::::::grid

!!! tip Render Queue
- отслеживает все изменения DOM модели.
- раз в 16.6 мс. (при 60FPS) страница ререндерится и весь ее DOM обновляется
  !!!

!!! info Microtask Queue
- Promise.prototype.**then**()
- Promise.prototype.**catch**()
- Код внутри async функций, после выполнения await
- Микротаски выполняются сразу после завершения Таски, c которой они связанны
  !!!
  ::::::
  ::::::grid

:::card
## Порядок очередей
1. Render Queue
2. Task Queue (Callback Queue, Macrotask Queue, Event Queue)
    - После каждой задачи выполняются связанные с ней Микротаски
      :::

:::card

:::
::::::

## Отличия ноды и браузера
| Браузер | Node |
| — | — |
| Web API | libuv + Node API |
| [libevent](https://libevent.org/) | libuv |
| DOM, Render Queue | ➖ |
| ➖ | `process.nextTick()` |
| ➖ | `setIntermediate()` |
| 🐤 запускается в песочнице | 👨‍🍳 имеет доступ к системным операциям |
| `window` | `process` |

> в браузерах после пяти уровней вложенности, минимальный интервал для таймера устанавливается в 4мс

# Pseudocode
> Упрощенная реализация цикла событий
:::code
> Спецификация говорит о выборе следующей задачи для выполнения так:
> > Select the oldest task on one of the event loop's task queues.
>
> То есть, конкретные очереди не специфицируются и каждая среда выполнения свободна в выборе способов организации очередей и их приоритетности.
```js
eventLoop = {
```
> Например, для какого-нибудь браузера они могут выглядеть как-нибудь так:
```js
    taskQueues: {
        events: [], // UI events
        parser: [], // HTML parser
        callbacks: [], // setTimeout cbs
        resources: [], // image loading
        domManipulation: []
    },

    microtaskQueue: [],

    nextTask: function() {
        for (let q of taskQueues)
            if (q.length > 0) return q.shift()
        return null
    },

    executeMicrotasks: function() {
        if (scriptExecuting) return

        const microtasks = this.microtaskQueue
        this.microtaskQueue = []

        for (let t of microtasks) {
			t.execute()
		}
    },

    needsRendering: function() {
        return vSyncTime() && (needsDomRerender() || hasEventLoopEventsToDispatch());
    },

    render: function() {
        dispatchPendingUIEvents()
        resizeSteps()
        scrollSteps()
        mediaQuerySteps()
        cssAnimationSteps()
        fullscreenRenderingSteps()
        animationFrameCallbackSteps()


        while (resizeObserverSteps()) {
            updateStyle()
            updateLayout()
        }

        intersectionObserverObserves()
        paint()
    }
}
```
> Теперь создадим бесконечный цикл по типичному для браузеров алгоритму: задача
```js
while(true) {
    task = eventLoop.nextTask()
    if (task) {
        task.execute()
    }
    eventLoop.executeMicrotasks()
    if (eventLoop.needsRendering())
        eventLoop.render()
}
```
:::

# 🍻
- https://www.youtube.com/watch?v=w4EHA9xqoNw
- https://www.youtube.com/watch?v=6XyifyzmSMM&t=351s
- https://habr.com/ru/post/517594/
- [Javascript Visualizer 9000](https://www.jsv9000.app/)