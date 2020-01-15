# ES6

## let 和 const 命令

### JS 的变量声明

### let 命令

- 描述

	- ES6 新增了 let 命令，用于声明变量。其用法类似于 var，但是所声明的变量只在 let 命令所在的代码块有效，在代码块外调用 let 声明的变量会报错。

## Set 和 Map 数据结构

### Set

- 描述

	- 1. 成员唯一  
	- 2.可遍历（遍历器）
	- 3. 成员结构：值—值（两者相同）
	- 4. 接受具有 Iterator 接口的结构作为构造参数
	- 5. 遍历顺序为插入顺序

- 属性

	- constructor
	- size

- 方法

	- add(value)
	- delete(value)
	- has(value)
	- clear()

- 遍历操作

	- keys()：返回键名的遍历器
	- values()：返回键值的遍历器
	- entries()：返回键值对的遍历器
	- forEach()：使用回调函数遍历每个成员（无返回值）

### WeakSet

- 与 Set 类似  差异：1. 成员只能为对象  2. 弱引用 3. 不可遍历
- 用处：适合临时存放一组对象，以及存放跟对象绑定的信息，只要外部引用消失，结构内部引用就会自动被垃圾回收清除。防止内存泄漏。
- 实际应用：1. 以 DOM 节点为键名，注册监听事件 2. 部署私有属性，内部属性使用 WeakMap 构建，如果删除实例，也会随之消失

### Map

- 描述

	- 1. 成员唯一（后来赋值会覆盖前值）
	- 2.可遍历（遍历器）
	- 3. 成员结构：键-值

		- 键类型不限于字符串，Object 的键只能为字符串）
		- 键与内存地址绑定，内存地址不一样（同名），视为两个键
		- 键为简单类型：严格相等则为一个键，包括0和-0，NaN也为同个键

	- 4. 接受具有 Iterator 接口的结构作为构造参数
	- 5. 遍历顺序为插入顺序

- 属性

	- 与 Set 类似

- 方法

	- 与 Set 类似（设置获取方法不同）
	- get(key)
	- set(key, value)

### WeakMap

- 与 WeakSet 同理

## Proxy

### 概述

- 用于修改某些操作的默认行为，提供了一种机制可以对外界的访问进行过滤和改写——“代理器”
- 生成 Proxy 实例: new Proxy(target, handler);

	- target: 要拦截的目标对象
	- handler: 定制拦截行为
	- 注：要使 Proxy 起作用，必须针对 Proxy 实例进行操作，而不是针对目标对象（target）进行操作。

### 方法

- get

	- 描述: 用于拦截某个属性的读取操作
	- 参数: target, property,recevier(可选)
	- 应用

		- 利用 get 可以将读取属性的操作转变为执行某个函数，从而实现属性的链式操作。
		- 利用 get 拦截实现一个生成各种 DOM 节点的通用函数

- set

	- 描述: 用于拦截某个个属性的赋值操作
	- 参数: target, property, , recevier(可选)
	- 应用

		- 利用 set 方法实现数据绑定，每当对象发生变化时，自动更新DOM（还未寻求答案）
		- 利于 set 保证被代理对象的属性值符合要求
		- 结合 get 和 set 方法可以防止对象内部属性（下划线开头 ' _ '）被外部读/写。

	- 注: 如果目标对象自身的某个属性不可写也不可配置,那么 set 不得改变这个属性的值,只能返回同样的值,否则报错

- apply

	- 描述: 拦截函数的调用、call 和 apply 操作
	- 参数: target, thisArg(目标对象的上下文(this)), args(目标对象的参数数组)

- has

	- 描述: has 方法用来拦截 HasProperty 操作(判断对象是否具有某个属性)
	- 应用: 隐藏某些属性,使其不被 in 运算符发现 ( 对 for...in 无效)

- constuct

	- 描述: 用于拦截 new 命令,必须返回对象
	- 参数: target, args

- deleteProperty

	- 描述: 用于拦截 delete 操作,当该对象抛出错误或返回 false 则当前属性无法被 delete 命令删除
	- 注: 目标对象自身的不可配置(configurable)的属性不能被该方法删除,否则会报错

- defineProperty

	- 描述: 用于拦截 Obect.defineProperty 操作(在一个对象上定义一个新属性,或者修改一个对象的现有属性)
	- 注: 若对象不可扩展(extensible), 则 defineProperty 不能增改加目标对象中不存在的属性,否则会报错。如果目标对象的某个属性不可写(writable) 或不可配置(configurable),则 defineProperty 方法不得改变这两个设置。

- getOwnPropertyDescriptor

	- 描述：拦截 Object.getOwnPropertyDescriptor 操作(该方法返回指定对象上的一个自有属性对应的属性描述符)，返回一个属性描述对象或 undefined

- getPrototypeOf

	- 描述: 用来拦截获取对象原型。

		- Object.prototype.__proto__: 访问器属性，通过它访问对象内部的[[Prototype]] (推荐使用 Object/Reflect.getPrototypeOf)
		- Object.prototype.isPrototypeOf()：检验一个对象是否在另一个对象的原型链上。
		- Object.getPrototypeOf()：返回指定对象的原型（内部[[Prototype]]的值）
		- Reflect.getPrototypeOf(): 上同
		- instanceof：检查构造函数的 prototype 属性是否在某个实例对象的原型链上。

	- 注：该方法返回值必须是对象或 null，否则会报错。另外，如果目标对象不可扩展（extensible), 该方法必须返回目标对象的原型对象。

- setPrototype

	- 描述: 用于拦截 Object.setPrototypeOf 方法(设置一个指定的对象的原型，即内部的[[Prototype]]到另一个对象，使用Object.create()来创建带有想要[[Prototype]]的新对象更好）

- isExtensible

	- 描述: 用来拦截 Object.isExtensible 操作(判断一个对象是否可扩展的(是否可以在它上面添加新的属性))，只能返回布尔值，否则返回值会被自动转换布尔类型。
	- 注：强限制，返回值必须与目标对象的 isExtensible 属性保持一致，否则会报错。

- ownKeys

	- 描述: 用来拦截对象自身属性的读取操作,返回的数组成员只能是字符串或 Symbol 值。

		- Object.getOwnPropertyNames(): 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。
		- Object.getOwnPropertySymbols(): 返回一个给定对象自身的所有 Symbol 属性的数组。
		- Object.keys(): 返回一个由一个给定对象的自身可枚举属性组成的数组。

	- 注： 使用 Object.keys 时，目标上不存在的属性、属性名为 Symbol 值、不可遍历(enumerable)的属性会被该方法过滤。如果目标对象自身包含不可配置的属性，则该属性必须被该方法返回。如果目标对象是不可扩展的，返回的数组中必须含有原对象的所有属性，且不能包含多余的属性。

- preventExtensions

	- 描述: 用于拦截 Object.preventExtensions 操作(该方法让一个对象变的不可扩展，也就是永远不能再添加新的属性)，必须返回一个布尔值，否则会被自动转换为布尔值。
	- 注: 限制，只有目标对象不可扩展时（即 Object.isExtensible(proxy) 为 false ,该方法才能返回 true。

- Proxy.revocable

	- 描述: 返回一个可取消的 Proxy 实例
	- 应用

		- 目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。

### this问题

- 问题：虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下也无法保证与目标对象的行为一致。主要原因就在 Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代，此外，有些原生对象的内部属性只有通过正确的this才能获取（例如getDate），所以Proxy 也无法代理
- 解决：this 绑定原始对象就可以解决这个问题，例如: 在get 方法内 target.xxx.bind(target);

## Reflect

### 描述

-  将 Object 对象的一些明属于语言内部的方法（比如 Object.defineProperty) 放到 Reflect 对象上，未来的新方法将只在 Reflect 对象上部署，即从 Reflect 可对象上可以获得语言内部的方法
- 修改某些 Object 方法的返回结果，其变更合理。
- 让 Object 操作都变成函数行为，某些 Object 操作是命令式，例如 in 和 delete 操作 -- Relfect.has(obj, name) 和 Reflect.deleteProperty(obj, name)
- Reflect 对象的方法与 Proxy 对象的方法一一对应，这使得 Proxy 对象可以方便地调用对应的 Reflect 方法来完成默认行为，作为修改行为的基础。也就是说，无论 Proxy 怎么修改默认行为，我们总可以在 Reflect 上获取默认行为。

### 方法

- 注：大部分方法，如果第一个目标对象参数不是对象，会报错。Object 行为不同方法不一样
- Reflect.get(target, name, recevier)

	- 描述; 查找并返回 target 对象的 name 属性，若无则返回undefined
	- 注：若 name 属性部署了读取函数（getter），则读取函数的 this 绑定 receiver(接收者); 

- Reflect.set(target, name, value, recevier)

	- 描述: 设置 target 对象的 name 属性等于 value
	- 注：若 name 属性部署了赋值函数（setter），则读取函数的 this 绑定 receiver(接收者);  Reflect.set 会触发 Proxy.defineProperty 拦截。

- Reflect.has(obj, name)

	- 描述: 对应 `name in obj` 中的 in 运算符

- Reflect.deleteProperty(obj, name)

	- 描述: 对应 `delete obj[name]`，用于删除对象的属性。如果删除成功或被删除的属性不存在，就返回 true；如果删除失败或者被删除的属性依然存在，返回 false。

- Reflect.construct(target, args)

	- 描述: 等同于 `new target(...args)`，提供了一种不使用 new 来调用构造函数的方法。

- Reflect.getPrototypeOf(obj)

	- 描述: 用于读取对象的 __proto__ 属性，对应 Object.getPrototypeOf(obj)。
	- 注: 如果参数不是对象 Object.getPrototypeOf 会把参数转为对象，再运行，而 Reflect.getPrototypeOf 会报错。

- Reflect.setPrototypeOf(obj, newProto)

	- 描述: 用于设置对象的 __proto__ 属性，返回第一个参数对象，对应 Object.setPrototypeOf(obj, newProto)。

- Reflect.apply(func, thisArg, args)

	- 描述: 等同于 `Function.prototype.apply.call(func, thisArg, args)`, 用于绑定 this 对象后执行给定函数。
	- 如果要绑定一个函数的 this 对象，可以写成 fn.apply(obj, args) 的形式，但是如果函数定义了自己的 apply 方法，那么就只能写成 Function.prototype.apply.call(fn, obj, args)的形式，采用 Reflect 对象可以简化这种操作。

- Reflect.defineProperty(target, propertyKey, attributes)

	- 描述: 基本等同于 Object.defineProperty，用来为对象定义属性。今后，后者会被逐渐废除，因此从现在开始请使用 Reflect.defineProperty 来代替它。

- Reflect.getOwnPropertyDescriptor(target, propertyKey)

	- 描述: 基本等同于 Object.getOwnPropertyDescriptor, 用于指定属性的描述对象，将来会替代后者。

- Reflect.isExtensible(target)

	- 描述: 对应 Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。

- Reflect.preventExtensions(target)

	- 描述: 对应 Object.preventExtensions 方法，用于使一个对象变为不可扩展的。返回一个布尔值，表示是否操作成功。

- Reflect.ownKeys(target)

	- 描述: 用于返回对象的所以属性，基本等同于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols 之和。

### 实例

- 使用 Proxy 实现观察者模式

	- 描述：观察者模式（Observer mode）指的是函数自动观察数据对象的模式，一旦对象有变化，函数就会自动执行。

## Promise

### 描述

- Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件更合理且更强大(解决回调地狱问题)。简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

### 对象特点

- 对象的状态不收外界影响，只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。“Promise”——承诺，表示其他手段无法改变。

	- Pending(进行中)
	- Fulfilled(已成功)
	- Rejected(已失败)

- 一旦状态改变就不会再变，改变后任何时候都可以得到这个结果。Promise 对象的状态改变只有两种可能：从 Pending 变为 Fulfilled 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变，而是一直保持这个结果，这时就称为 Resovled (已定型)。

### 缺点

- 无法取消 Promise , 一旦新建它就会立刻执行，无法中途取消。
- 如果不设置回调函数，Promise 内部抛出的错误不会反应到外部。
- 当处于 Pending 状态时，无法得知目前进展到哪一个阶段（是刚刚开始还是即将完成）。

### 基本使用

- Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject，它是两个函数用来改变 Promise 对象的状态

	- var promise = new Promise(function (resolve, reject) {})

- Promise 实例生成以后，可以用 then 方法分别指定 Resolved 状态 和 Rejected 状态的回调函数。

	- promise.then(function(value){}, function(value){})

- 注：then 方法指定的回调函数将在当前脚本所有同步任务执行完成后才会执行，Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

### 方法

- then

	- 描述：

		- 作用是为 Promise 实例添加状态改变时的回调函数。then方法可以接受两个回调函数作为参数，第一个是对象状态变为 Resolved 时调用，第二个(可选)是对象状态变为 Rejected 时调用。这两个函数都接受 Promise 对象的传出值作为参数。
		- then 方法返回的是一个新的 Promise，所以可以采用链式写法，即 then 方法后面再调用另一个 then 方法。前一个 then 返回的可能还是一个 Promise 对象(即有异步操作)，后一个 then 的回调函数就会等待该对象状态发生变化再调用

- catch

	- 描述：

		- 用于指定发生错误时的回调函数，等同于 .then(null, rejection) 的别名。如果异步操作抛出错误，状态就会变为 Rejected，然后调用 catch 方法指定的回调函数处理这个错误。
		- Promise 对象的错误具有"冒泡"性质，会一致向后传递直到被捕获位置，也就是说，错误总会被下一个 catch 语句捕获

	- 注：then 方法指定的回调函数如果在运行中抛出错误，也会被catch 捕获；最好不要在 then 方法定义 Rejected 状态的回调函数( 即 then 的第二个参数) , 而应选择 catch 方法。

- resolve

	- 描述：

		- 将现有对象转换为 Promise 对象

	- 参数

		- 参数是一个 Promise 实例，不做任何修改，原封不动地返回这个实例
		- 参数是一个 thenable 对象（指具有 then 方法的对象）, 该方法会将这个对象转为 Promise 对象，然后立即执行 thenable 对象的 then 方法 
		- 参数不是具有 then 方法的对象或根本不是对象，那么该方法返回一个新的 Promise 对象，状态为 Resolved
		- 不带有任何参数，直接返回一个 Resolved 状态的 Promise 对象

- reject

	- 描述：

		- 返回一个新的 Promise 实例，状态为 Rejected

	- 注：Promise.reject() 方法的参数会原封不动地作为 reject 的理由变成后续方法的参数。

- all

	- 描述：

		- 用于将多个 Promise 实例包装成一个新的 Promise 实例，该方法接受一个具有 Iterator 接口的对象作为参数。若参数成员不为 Promise 实例，则调用 Promise.resolve 方法将参数转为 Promise 实例

			- var p = Promise.all([p1, p2, p3]);

	- 实例状态：

		- 只有参数对象成员的实例状态都变成 Fulfilled，该 Promise 实例的状态才会变成 Fulfilled，此时参数对象的成员的返回值组成一个数组，传递给该实例的回调函数。
		- 只要参数对象的成员中实例有一个被 Rejected，该 Promise 实例状态就会变成 Rejected，此时第一个被 Rejected 的参数成员的返回值会传递给该实例的回调函数。

	- 注：如果作为参数的 Promise 实例自身定义了 catch 方法，那么它被 rejected 时并不会触发 Promise.all() 的catch 方法。

- race

	- 描述：

		- 该方法同样是将多个 Promise 实例包装成一个新的 Promise 实例。区别在于实例状态改变所依据的不同。若参数成员不为 Promise 实例，则调用 Promise.resolve 方法将参数转为 Promise 实例。

	- 实例状态：

		- 只要参数对象的成员中有一个状态率先改变状态，Promise 实例状态就会改变，此时那个率先改变的参数成员的实例的返回值会传递给该实例的回调函数。

### 附加方法

- done

	- 描述：

		- 无论 Promise 对象的回调链以 then 方法还是 catch 方法结尾，只要最后一个方法抛出错误，都有可能无法捕捉到（因为 Promise 内部的错误不会冒泡到全局）。为此，可以提供一个 done 方法，他总处于回调链的尾端，保证抛出任何可能出现的错误

	- 实现代码

		- 待整理

- finally

	- 描述：

		- finally 方法用于指定不管 Promise 对象最后状态如何都会执行的操作。它与 done 方法的最大区别在于，它接受一个普通的回调函数作为参数，该函数不管怎样都必须执行。

### 应用

- 加载图片

	- 将图片的加载写成一个 Promise，一旦加载完成，Promise 的状态就发生变化。

		- 待整理

- Generator函数与 Promise 的结合

	- 未读

### Promise.try()

- 描述：

	- 无需区分执行函数是同步还是异步操作，都可以用Promise.try()

- 实现

	- 使用 async 函数也能实现同样功能
	- 使用立即执行的匿名函数来执行 new Promise()

- 注：只是一个提案

## Iterator

### 描述

- 遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构，只要部署 Iterator 接口，就可以完成遍历操作（即以此处理该结构的所有成员）。

### 作用

- 为各种数据结构提供一个统一的、简便的访问接口
- 使得数据结构的成员能够按照某种次序排列
- ES6创造了一种新的遍历命令—— for...of 循环，Iterator 接口主要提供 for...of 消费。（也可以使用 while 循环）

### 遍历过程

- 每次调用 next 方法都会返回数据结构的当前成员的信息，具体来说就是返回一个包含 value 和 done 两个属性的对象。value 是当前成员的值，done 是表示遍历是否结束( 布尔值 )。

	- { value: xx, done: false }  遍历完成 { value: undefined, done: true } 

- 创建一个指针对象，指向当前数据结构的起始位置。（遍历器对象本质上就是一个指针对象）。
- 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员
- 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员
- 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

### 默认 Iterator 接口

- 描述：

	- 默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说一个数据结构只要句有 Symbol.iterator 属性，就可以认为是“可遍历的”(iterable)。调用 Symbol.iterator 方法，可以得到当前数据结构默认的遍历器生成函数，Symbol.iterator 本身是一个表达式，返回 Symbol 对象的 iterator 属性。

- 具有默认遍历器接口的数据结构

	- Array
	- Map
	- Set
	- String
	- TypeArray
	- 函数的 arguments 对象
	- NodeList 对象(部分类数组对象)

- 注：

	- 其他数据结构（主要是对象）的 Iterator 接口都需要自己在 Symbol.iterator 属性上面部署，这样才会被 for...of 循环遍历，之所以没有默认部署 Iterator 接口，是因为对象属性的遍历先后顺序是不确定的，需要开发者手段指定
	- 本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口就等于部署一种线性转换。不过，严格的说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES6原生提供了。

### 遍历器对象的方法

- 描述：

	- 若自己写遍历器对象生成函数，那么next 方法是必须部署的，return 方法 和 throw 方法则是可选部署的

- return

	- 使用场合是，如果 for...if 循环提前退出（通常是因为出错或者有 break 语句或 continue 语句），就会调用 return 方法；如果一个对象在完成遍历前需要请理或释放资源，就可以部署 return 方法

- throw

	- 配合Generator 函数使用

### 部署 Iterator 接口

- 可以在构造函数的原型链上部署 Symbol.iterator 方法，调用该方法会返回遍历器对象 iterator，调用该对象的 next 方法，在返回一个值的同时自动将内部指针转移到下一个实例。
- 对于类似数组的对象（存在数值键名和 length 属性），部署 Iterator 接口有一个简便的方法，即使用 Sysmbol.iterator 方法直接引用数组的 Iterator 接口。注意，普通对象部署数组的 Symbol.iterator 方法并无效果。
- Symbl.iterator 方法的最简单实现使用 Generator 函数
- 对于没有具有 Iterator 接口的类似数组的对象，一个简便的解决方法就是使用 Array.from 方法将其转为数组。

### 使用场合

- 对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法。
- 扩展运算符（ ... ) 也会调用默认的 Iterator 接口。
- yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
- 其他场合

	- for...of
	- Array.from
	- Map()、Set()、WeakMap()、WeakSet() (如 new Map(['a',1], ['b',2])
	- Promise.all() / Promise.race()

## for...of 

### 描述：

- 一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员。也就是说，for...of 循环内部调用的是数据结构的 Symbol.iterator 方法

### 使用范围：

- 数组

	- for...of 循环可以代替数组实例的 forEach 方法
	- 如果要通过 for...of 循环获取数组的索引，可以借助数组实例的 entries 方法和 keys 方法。
	- 数组的遍历器接口只返回具有数字索引的属性。

- Set 和 Map 结构

	- 遍历的顺序是按照各个成员被添加进数据结构的顺序；其次，Set数据结构遍历时返回的时一个值，而 Map 结构遍历返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。

- 某些 类似数组的对象(比如 arguments 对象、DOM NodeList 对象)
- Generator 对象
- 字符串

	- 可以正确识别 32 位 UTF-16 字符

### 作用

- JS原有的 for...in 循环只能获得对象的键名，不能直接获取键值。ES6 提供的 for...of 循环允许遍历获得键值。

### 注：

- 对于普通对象，一种解决办法是，使用 Object.keys 方法将对象的键名生成一个数组，然后再用 for...of 遍历这个数组，另一种是使用 Generator 函数将对象重新包装一下

### 与其他遍历方法比较

- for：较为繁琐
- forEach：无法中途跳出 forEach 循环, break 命令或 return 命令都不能生效。
- for...in

	- 缺点

		- 数组d的键名是数字，但是 for...in 循环是以字符串作为键名，"0"、"1"、"2"
		- for...in 循环不仅可以遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
		- 某些情况下，for...in 循环会以任意顺序遍历键名。

	- 注：for...in 循环主要是为遍历对象而设计的，不适用遍历数组。

- for...of

	- 相比较之的优点

		- 有着 for...in 一样的简洁语法，但是没有 for...in 那些缺点。
		- 不同于 forEach 方法，它可以与 break、continue 和 return 配合使用。
		- 提供了遍历所有数据结构的统一操作接口

## Generator

### 描述：

- Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
- 从语法上，首先把它理解成一个状态机，封装了多个内部状态。其次执行 Generator 函数会返回一个遍历器对象（也就是 Generator 也是一个遍历器对象生成函数），返回的遍历器对象可以依次遍历 Generator 函数内部的每一个状态。
- 从形式上，Generator 函数是一个普通函数，但是有两个特征

	- 一是 function 命令与函数名之间有一个星号 * （写在 function 关键字和函数名之间即可）
	- 二是函数体内部使用 yield 语句定义不同的内部状态(yield—产出)

- Generator 可以生成一系列的值，名称的来历——“生成器”
- function* generatorFunction() {}

### 语法

- 调用方法

	- Generator 函数的调用方法也是在函数名后加一对圆括号，不同的是，调用后该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是遍历器对象（ Iterator Object）。
	- 下一步，必须调用遍历器对象的 next 方法，使得指针移向下一个状态。也就是说，调用 next 方法，内部指针就从函数头部或上一次停下来的地方开始执行,直到遇到下一条 yield 语句（或 return 语句）为止。
	- 每次调用遍历器对象的 next 方法，就会返回一个有着 value 和 done 两个属性的对象。value 表示当前内部状态(yield语句后面表达式的值)的值，done 属性是一个布尔值，表示是否遍历结束
	- 简单来说，Generator 函数是分段执行的，yield 语句是暂停执行的标记，而 next 方法可以恢复执行。

- yield 表达式

	- 描述：

		- 暂停标志（只允许用在 Generator 函数内）

	- yield 与 return

		- 相似之处在与都能返回紧跟在语句后的表达式的值。
		- 区别在于每次遇到 yield 函数暂停执行，下一次会从该继续向后执行，而 return 语句不具备位置记忆的功能。
		- 一个函数内只能执行依次（或者说一条）return 语句，但是可以执行多次（或者说多条）yield 语句。

	- Generator 函数可以不用 yield 语句，这时就变成了一个单纯的暂缓执行函数，只有调用 next 方法才会执行。
	- 注：

		- 正常函数只能返回一个值，因为只能执行一次 return 语句；Generator 函数可以返回一系列的值，因为可以有任意多条 yield 语句。
		- yield 表达式如果用在另一个表达式之中，必须放在圆括号里面，用作函数参数或放在赋值表达式的右边，可以不加括号。

			- console.log('11' + (yield 123)); | let input = yield;

- yield* 表达式

	- 描述

		- 可以在 Generator 函数内部调用另一个 Generator 函数
		- 从语法角度看，如果 yield 命令后面跟的是一个遍历器对象，那么需要在 yield 命令后面加上星号，表明返回的是一个遍历器对象，这被称为 yield* 语句。

	- 注

		- yield* 后面的 Generator(没有return 语句时) 等同于在 Generator 函数内部部署一个 for... of 循环。
		- 任何数据结构只要有 Iterator 接口，就可以被 yield* 遍历。
		- 如果被代理的 Generator 函数有 return 语句，那么可以向代理它的 Generator 函数返回数据。

	- 应用

		- 取出嵌套数组的所有成员（待整理）
		- 遍历完全二叉树（待整理）

- next 方法

	- next 运行逻辑

		- 遇到 yield 语句就暂停执行后面的操作，并将紧跟在 yield 后的表达式的值作为返回的对象的 value 属性值。
		- 下一次调用 next 方法时再继续往下执行，直到遇到下一条 yield 语句
		- 如果没有再遇到新的 yield 语句，就一直运行到函数结束，直到 return 语句位置，并将 return 语句后面的表达式的值作为返回对象的 value 属性值。
		- 如果该函数没有 return 语句，则返回对象的 value 属性值为 undefined。
		- 注：只有调用 next 方法且内部指针指向该语句才会执行 yield 语句后面的表达式，因此等于为 JavaScript 提供了手动的“惰性求值”	(Lazy Evaluation) 的语法功能。

	- 参数

		- yield 语句本身没有返回值，或者说总是返回 undefined，next 方法可以带有一个参数，该参数会被当作上一条yield 语句的返回值。
		- 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，其上下文状态(context) 是不变的。通过next 方法的参数就有办法在 Generator 函数开始运行后继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段从外部向内部注入不同的值，从而调整函数行为
		- 注：第一次使用 next 方法是传递参数是无效的(因为没有上一条 yield 表达式)，只有从第二次使用 next 方法开始，参数才是有效的。从语义上讲，第一个 next 方法用来启动遍历器对象，所以不用带有参数。

- Generator.prototype.throw

	- 描述

		- Generator 函数体外抛出的错误可以在函数体内捕获，函数体内抛出的错误也可以被函数体外的 catch 捕获。

	- 参数

		- 接受y一个参数，该参数会被 catch 语句接收（建议抛出 Error 对象的实例。

	- 注：

		- 不要混淆遍历器对象的 throw 方法和全局的 throw 命令。全局的 throw 命令抛出的错误只能被函数体外的 catch 语句捕获。
		- 若 Generator 函数内部没有部署 try...catch 代码块，那么 throw 方法抛出的错误将被外部 try...catch 代码块捕获。
		- 若 Generator 函数内部部署了 try...catch 代码块，那么遍历器的 throw 方法抛出的错误不影响下一次遍历，否则遍历直接终止。
		- throw 方法捕获以后会附带执行下一条 yield 表达式，即附带执行一次 next 方法。

- Generator.prototype.return

	- 描述

		- 可以返回给定的值，并终结 Generator 函数的遍历。

	- 注

		- 若函数体内有 try...finally 代码块，那么 return 方法会推迟到 finally 代码块执行完再执行。

- for...of 循环

	- 描述

		- 可以自动遍历 Generator 函数生成的 Iterator 对象，且此时无需调用 next 方法。

	- 终止条件

		- 一旦 next 方法的返回对象的 done 属性为true，循环就会终止，且不包含该返回对象。

- 作为对象属性

	- 简写为 let obj = { * gMethod(){} }

		- 等价于 let obj={ gMethod: function* (){} }

- Generator 函数 this

	- this 指向 Generator 函数返回的遍历器实例
	- Generator 函数不能跟 new 命令一起使用
	- 可以使用 call 方法让一个对象绑定 Generator 内部的 this，这样函数调用后，这个对象就是 Generator 函数的实例对象了。
	- 例子：改造成构造函数（待整理）

### 应用

- 实现状态机
- 作为协程使用
- 异步操作的同步化表达

	- 通过 Generator 部署 AJAX，可以用同步方式表达

- 控制流管理

	- 把回调函数(回调地狱)改成直线执行的形式，相比 Promise 进一步改善。

- 部署 Iterator 接口
- 作为数据结构

	- 因为 Generator 函数可以返回一系列的值，这以为着它可以对任意表达式提供类似数组的接口，使得数据和操作具备类似数组的接口。

### 异步应用

- ES6之前，异步编程方法

	- 回调函数

		- 描述

			- 所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务时便直接调用这个函数。回调函数的英文名叫 callback——“重新调用”

		- 注：

			- Node 约定回调函数的第一个参数必须是错误对象 err（如果没有错误，该参数就是 null）的原因是，执行分成两段，第一段执行以后，任务所在的上下文环境就已经结束了。在这之后抛出的错误，其原来的上下文环境已经无法捕捉了，只能当作参数传入第二段。

	- 事件监听
	- 发布/订阅
	- Promise 对象

		- 描述

			- 当异步操作多重嵌套，代码不是纵向发展，而是横向发展，导致乱成一团无法管理，因为多个异步操作形成了强耦合，只要有一个操作要修改，它的上层会调函数和下层回调函数都要跟着修改。这种情况就称为“回调函数地狱”(callback hell)。
			- Promise 对象就是为了解决这个问题而被提出的。它不是新的语法功能，而是一种新的写法，允许将会调函数的嵌套改成链式调用。

		- 问题

			- Promise 的最大问题是代码冗余，原来的任务被 Promise 包装之后，无论上面操作，一眼看上去都是许多 then 的堆积，原来的语义变得很不清除。

- 异步

	- 描述

		- 所谓“异步”，简单来说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好准备后再回头执行第二段。
		- 例如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读文件。然后程序执行其他任务，等到操作系统返回文件后再接着执行任务的第二段（处理文件），这种不连续的执行就叫作异步。
		- 相应的，连续执行叫作同步。由于是连续执行，不能插入其他任务，所以操作系统从硬盘读取文件的这段事件，程序只能等待。

- Generator 函数

	- 了解协程

		- 传统的编程语言中早有异步编程的解决方案（其实是多任务的解决方案），其中一种叫作"协程"(coroutine)，意思是多个线程互相协作，完成异步任务。
		- 协程有点像函数，又有点像线程。运行流程大致如下

			- 第一步，协程A开始执行。
			- 第二步，协程A执行到一半，进入暂停状态，执行权转移到协程B中。
			- 第三步，（一段时间后）协程B交还执行权
			- 第四步，协程A恢复执行。

	- 特点

		- Generator 函数是协程在 ES6 中的实现，最大的特点就是可以交出函数的执行权（即暂停执行）。
		- 整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方都用 yield 语句注明。
		- Generator 可以暂停执行和恢复执行，是它能封装异步任务的根本原因。除此之外，还有两个特性使它可以作为异步编程的完整解决方案：

			- 函数体内外的数据交换

				- next 返回值的 value 属性是向函数体外输出数据
				- next 方法可以接受参数，向函数体内输入数据

			- 错误处理机制

		- 虽然 Generator 函数将异步操作表示得很简介，但流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。

	- 自动流程管理

		- Thunk 函数

			- 了解参数的求值策略，即函数的参数到底该在何时求值

				- "传值调用"(call by value)，即在进入函数体之前就计算参数表达式的值。C语言就采用这种策略。
				- "传名调用"(call by name)，即直接将参数表达式传入函数体内，只在用到它的时候求值。Haskell 语言采用这种策略。
				- 注：各有利弊。传值调用比较简单，但是对参数求值的时候，实际上还没有用到这个参数，有可能会造成性能损失。

			- 描述

				- 编译器的"传名调用"的实现往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体，这个临时函数就称为 Thunk 函数。（是"传名调用"的一种实现策略，可以用来替换某个表达式）。

			- JS的 Thunk 函数

				- 描述：JS语言是传值调用，它的 Thunk 函数含义有所不同。在JS中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

					- fs模块的 readFile 方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它编程了一个单参数函数，只接受回调函数作为参数，这个单参数版本就叫 Thunk 函数。

				- 简单的 Thunk 函数转换器

					- ES5版本

					- ES6版本

					- 利用上面的转换器，生成 fs.readFile 的Thunk 函数。

				- Thunkify 模块

					- 安装：$ npm install thunkify
					- 使用方式

					- 源码

				- 基于 Thunk 函数的 Generator 执行器

					- 描述：自动执行 Generator函数，不管内部有多少个异步操作，直接把 Generator 函数传入 run 函数即可。前提是每一个异步操作都要是 Thunk 函数，也就是说，跟在 yield 命令后面的必须是 Thunk 函数。
			- 注：Thunk 函数并不是 Generator 函数自动执行的唯一方案，因为自动执行的关键是，必须有一种机制自动控制 Generator 函数的流程，接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点。

		- 基于Promise 对象的自动执行

			- 沿用上面的 fs 模块把 readFile 方法包装成一个 Promise 对象

			- Generator 函数

			- 手动执行其实就是用 then 方法层层添加回调函数

			- 自动执行器

		- co 模块

			- 描述

				- 使用 co 模块无需编写 Generator 函数的执行器

					- var co = require('co');   co(gen);

				- co 函数返回一个 Promise对象，因此可以用 then 添加回调函数。（等待 Generator 函数执行结束后）

			- 原理

				- Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，这种机制要自动交回执行权。有两种方法可以做到这一点

					- 回调函数——将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
					- Promise 对象——将异步操作包装成 Promise 对象，用then 方法交回执行权。

				- co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象包装成一个模块。使用co 的前提条件是，Generator 函数的 yield 命令后面只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员全部都是 Promise 对象，也可以使用 co。

			- 注：co v4.0版本以后，yield 命令后只能是 Promise 对象，不再支持 Thunk 函数
			- 源码

				- 首先 co 函数接收 Generator 函数作为参数，返回一个 Promise 对象

				- 在返回的 Promise 对象里面，co先检查参数 gen 是否为 Generator 函数，若是，就执行该函数，得到一个内部指针，若不是就返回，并将 Promise 对象的状态改为 resolved。

				- 接着，co 将 Generator 函数的内部指针对象的 next 方法包装成 onFulfilled 函数，这主要是为了能够捕获抛出的错误。

				- next函数，反复调用自身

			- 应用

				- 处理并发的异步操作（即允许某些操作同时进行，等到它们全部完成才进行下一步。）要把并发的操作都放在数组或对象中，跟在 yield 语句后面。

## Module

### 语法

- 描述

	- 与其他模块方案比较

		- ES6 之前，最主要的模块加载方案有，CommonJS 和 AMD 两种，前者用于服务器，后者用于浏览器。
		- ES6 在语言规格的层面上实现了模块功能，而且实现的相当简单，完全可以取代现有的 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
		- ES6模块的设计思想是尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
		- CommonJS 和 AMD 模块都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。这种加载称为“运行时加载”，因为只有运行时才能得到这个模块的输出，导致完全没办法在编译时进行“静态优化”。

	- ES6模块的实质

		- 加载方式称为“编译时加载”或者静态加载，即ES6 可以在编译时就完成模块加载，效率比 CommonJS 模块的加载方式高，同时这也导致了 ES6模块本身无法被引用，因为它不是对象。

	- 优势

		- 因为是编译时加载，使得静态分析成为可能。有了它就能进一步拓展 JS 的语法，比如引入宏（macro）和类型检验（type system）这些只能依靠静态分析实现的功能。
		- 不再需要 UMD 模块格式，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库其实已经做到了这一点。
		- 将来浏览器的新 API 已经可以用模块格式提供，不再需要做成全局变量或 navigator 对象的属性。
		- 不再需要对象作为命名空间（比如 Math 对象），未来这些功能可以通过模块来提供。

- 严格模式

	- 描述

		- ES6 的模块自动采用严格模式，不管有没有在模块头部加上 "use strict"

	- 限制

		- - 变量必须声明后再使用。
		- - 函数的参数不能有同名属性，否则报错。
		- - 不能使用 with 语句。
		- - 不能对只读属性赋值，否则报错。
		- - 不能使用前缀 0 表示八进制数，否则报错。
		- - 不能删除不可删除的属性，否则会报错。
		- - 不能删除变量， delete prop，会报错，只能删除属性， delete global[prop]。
		- eval 不会在它的外层作用域引入变量。
		- - eval 和 arguments 不能被重新赋值
		- - 不能使用 arguments.callee，arguments.caller。
		- 禁止 this 指向全局对象。
		- 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈。
		- 增加了保留字（比如 protected、static 和 interface。

- export 命令

	- 描述

		- 模块功能主要又两个命令构成：export 和 import。export 命令用于规定模块的对外接口，import 命令用于输入其他模块提供的功能。
		- 一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果希望外部能够读取模块内部的某个变量，就必须使用 export 关键字输出该变量。

	- 写法

		- 输出变量

			- export var xxx = xxx;
			- var a = 1; var b = 2; var c = 3; export { a,b,c };

		- 输出函数或类

			- export function fn() {};
			- export class xxx {}

		- 用 as 重命名输出

			- function v1() {}; function v2() {}; export { v1 as streamV1, v2 as streamV2, v2 as streamLasestVersion }
			- 用 as  关键字重命名，重命名后，v2 可以用不同的名字输出两次

	- 注

		- export 命令规定是对外的接口，必须与模块内部的变量建立一一对应关系。

			- 报错

				- export 1;
				- var m = 1; export m;

		- export 语句输出的接口与其对应的值是动态绑定关系。即通过该接口可以去到模块内部实时的值。

			- CommonJS 模块输出的是值的缓存，不存在动态更新。

		- export 命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错（import 也是如此）。这是因为处于条件代码块中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

- import 命令

	- 描述

		- 通过 import 命令加载模块，import 命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号中的变量必须与被导入模块对外接口的名称相同。
		- import 后面的 from 指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js 后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件告诉 JavaScript 引擎该模块的位置。

	- 写法

		- 导入

			- import { a,b,c } from './xxx'

		- as 重命名

			- import { a as firstname }

	- 注

		- import 命令具有提升效果，会提升到整个模块的头部并首先执行。这种行为的本质是，import 命令是编译阶段执行的，在代码运行之前。
		- 由于 import 是静态执行，所以不能使用表达式和变量，只有在运行时才能得到结果的语法结构。
		- 如果多次重复执行同一句 import 语句，那么只会执行一次。因为加载的两个语句对应的是同个模块实，说明 import 语句是 Singleton 模式(单例模式)。

- 模块的整体加载

	- 描述

		- 除了指定加载某个输出值，还可以使用整体加载（即星号 *）来指定一个对象，所有输出值都加载在这个对象上。

	- 注

		- 模块整体加载的对象应该是可以静态分析的，所以不允许运行时改变。
		- export * 会忽略模块的 default 方法。

- export defaul 命令

	- 描述

		- 使用该命令为模块指定默认输出。
		- 一个模块只能有一个默认输出。
		- 本质是将该命令后面的值赋给 default 变量以后再默认，所以可以直接将一个值写在 export default 之后。

	- 写法

		- export default function fn() {}
		- 加载该模块时，import 命令无需知道原模块输出的名称，可以指定任意名字。无需大括号。

			- import xxx from './xxx'

	- 注

		- 可以在一条 import 语句中同时输入默认方法和其他接口。

			- import xx, { xx,x,xxx } from './xx'

- export 与 import 的复合写法

	- 描述

		- 如果在一个模块之中先输入后输出同一个模块，import 语句可以与 export 语句写在一起
		- 一样可以用 as 重命名

	- 写法

		- export { foo,bar } from ' ./xx '
		- 等价于 import { foo,bar  } from './xx';                
 export {foo ,bar };

- 模块的继承

	- 使用 export * from ‘xxx’; 来输入输出 xx 模块的所有属性和方法。

- 跨模块常量

	- 描述

		- 设置跨模块的常量（即跨多个文件），或者说是一个值要被多个模块共享。

	- 写法

		- 模块A： export const A = 1; 
                    export const B = 2; 
		- 模块B: import * as xxx from './A'; 
               console.log(xxx.A);  // 1
               console.log(xxx.B);  // 2
		- 模块C: import {A,B} from './A';                
               console.log(A);  // 1
               console.log(B);  // 2

- import()

	- 描述

		- import 命令会被 JS 引擎静态分析，先于模块内的其他模块执行（称为“连接” 更合适），不能在代码块中（比如，在 if 代码块中，或在函数之中）。
		- 这样的设计虽然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载不可能实现，所以 import 无法取代 Node 的 require 的动态加载功能。
		- 所以有个提案，引入 import() 函数，完成动态加载。
		- import() 函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，运行到这一句变回加载指定的模块。另外，import() 函数与所加载的模块没有静态连接关系，与 import 语句不同。
		- import() 类似于 Node 的 require 方法，区别主要是，前者是一部加载，后者是同步加载。

	- 返回值

		- import() 返回一个 Promise 对象

			- import('./xxxxxxx.js').then( module => { //... }). catch( err => { //... } );

	- 注

		- import() 加载模块成功后，这个模块会作为一个对象当做 then 方法的参数，所以可以使用对象解构赋值的语法，获取输出接口。

			- import('./xxxxxxx.js').then(( { export1, export2} ) => { //... });

		- 如果模块有 default 输出接口，可以用参数直接获得。也可以用具名输入的形式。

			- import('./xxxxxxx.js').then( module => { //... });
			- import('./xxxxxxx.js').then( {default: theDefault } => { //... });

		- 同时加载多个模块使用 Promise.all
		- import() 也可以使用在 asycn 函数中

	- 使用场合

		- 按需加载

			- import() 可以在需要的时候再加载某个模块

		- 条件加载

			- import() 可以放在 if 代码块中，根据不同的情况加载不同的模块。

		- 动态的模块路径

			- import() 运行模块路径动态生成

				- 例如：import( f() ).then(...);

### 加载实现

- CommonJS 模块的加载原理

	- 描述

		- CommonJS 的一个模块就是一个脚本文件。require 命令第一次加载该脚本时就会执行整个脚本，然后在内存中生成一个对象。

			- {  id:'.........' ,exports:{ ... },  loaded: true, ...      }

		- 左边的就是 Node 内部加载模块后生成的一个对象。该对象的 id 属性是模块名，exports 属性是模块输出的各个接口，loader 属性是一个布尔值，表示该模块的脚本是否执行完毕，其他属性省略。
		- 以后需要用到这个模块时就会到 exports 属性上取值。即使再次执行 require 命令，也不会再次执行该模块，而是到缓存之中取值。
		- 也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行异常，以后再加载时就返回第一次运行的结果，除非手动清除系统缓存。

- ES6 模块与 CommonJS 模块的差异

	- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

		- CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行结束时才会生产。
		-  ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

	- CommonJS 模块输出的是一个值的复制，ES6 模块输出的是值的引用。

		- CommonJS

			- CommonJS 模块输出的是值的复制，也就是说一旦输出一个值，模块内部的变化就影响不到这个值。
			- 输出缓存机制

		- ES6 模块

			- ES6 模块的运行机制是 JS 引擎对脚本静态分析的时候，遇到模块加载命令 import 就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用到被加载的模块中取值。
			- ES6 模块是动态引用，不会缓存运行的结果，而是动态地去被加载的模块取值，模块里面的变量绑定其所在的模块。
			- 由于 ES6 输入的模块变量只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。
			- export 通过接口输出的是同一个值。不同的脚本加载这个接口得到的都是同样的实例。

- 浏览器加载

	- 传统方法

		- 描述

			- 在 HTML 网页中，浏览器通过 <script> 标签加载 JavaScript 脚本。
			- 默认情况下，浏览器同步加载 JavaScript 脚本，即渲染引擎遇到 <script> 标签就会停下来，等到脚本执行完毕再继续向下渲染。如果是外部脚本，还必须加入脚本下载时间。
			- 若脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应，这明显是很不好的体验，所以浏览器允许脚本异步加载。

		- 写法

			- 内嵌脚本：<script type="application/javascript"> </script>
			- 外部脚本：<script type="application/javascript" src="xxx/xx/xx.js"></script> 
			- 注：由于浏览器脚本默认的语言是 JavaScript 因此 type="application/javascript" 可以省略。

		- 异步加载语法

			- 描述

				- <script> 标签打开 defer 或 async 属性，脚本就会异步加载。渲染引擎遇到这一行命令就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

			- 写法

				- defer：<script src="xx.js" defer></script>
				- async：<script src="xx.js" async></script>

			- 区别

				- defer 要等到整个页面正常渲染结束才会执行——"渲染完再执行"
				- async 一旦下载完成，渲染引擎就会中断渲染，执行整个脚本以后再继续渲染——“下载完就执行”
				- 若有多个 defer 脚本，会按照它们在页面中出现的顺序加载，而多个 async 脚本是不能保证加载顺序的。

	- ES6 模块

		- 描述

			- 浏览器加载 ES6 模块时也使用 <script> 标签，但是要加入 type="module" 属性。
			- 对于带有 type=“module” 的 <script> 标签，浏览器都是异步加载的，不会造成浏览器堵塞，即等到整个页面渲染完再执行模块脚本，等同于打开了 <script> 标签的 defer 属性
			- <script> 标签的 async 属性也可以手动打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。

		- 写法

			- <script type="module" src="xx.js"></script>
			- 等价于：<script type="module" src="xx.js" defer></script>
			- async 方式异步：<script type="module" src="xx.js" async></script>

		- 注

			- ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。
			- 对于外部的模块脚本

				- 代码是在模块作用域之中进行的，而不是在全局作用域中运行、模块内部的顶层变量是外部不可见的。
				- 模块脚本自动采用严格模式，无论有没有声明 use strict。
				- 模块之中可以使用 import 命令加载其他模块( .js 后缀不可省略，需要提供绝对 URL 或相对 URL)，也可以使用 export 命令输出对外接口。
				- 在模块之中，顶层的 this 关键字返回 undefined，而不是指向 window。也就是说，在模块顶层使用 this 关键字是无意义的。
				- 同一个模块如果加载多次，将只执行一次。

- Node 加载

	- 描述

		- Node 采用 CommonJS 模块格式，模块的输出都定义在 module.exports 属性上面。
		- Node 有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。目前的解决方案是将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。
		- 在静态分析阶段，一个模板脚本只要有一行 import 或 export 语句，Node 就会认为该脚本为 ES6 模块，否则就为 CommonJS 模块。如果不输出任何接口，但是希望被 Node 认为是 ES6 模块，可以在脚本中加上：export {};
		- 如果加载时不指定绝对路径，Node 加载 ES6 模块会与 require() 的规则一致。

			- import './foo';

				- ./foo.js
				- ./foo/package.json
				- ./foo/index.js

		- ES6 模块之中，顶层的 this 指向 undefined，CommonJS 模块的顶层 this 指向当前模块。这是两者的一个重大差异。

	- import 命令加载 CommonJS 模块

		- 描述

			- Node 会自动将 module.exports 属性当作模块的默认输出，即等同于 export default。
			- 如果采用整体输入的写法 ( import * as xxx from  xxx), default 会取代 module.exports 作为输入的接口。 要通过 xxx.default 这种写法才能获取到 module.exports。
			- CommonJS 模块的输出缓存机制在 ES6 加载方式下依然有效

		- 注

			- 由于 ES6 模块是编译时确定输出接口，CommonJS 模块是运行时确定输出接口，所以采用 import 命令加载 CommonJS 模块时，不允许采用这种写法：import { readfile } from 'fs';
			- 因为 fs 是 CommonJS 格式，只有运行时才能确定 readfile 接口，而 import 命令要求编译时就确定这个接口，解决方法就是改为整体输入。

	- require 命令加载 ES6 模块

		- 描述

			- 采用 require 命令加载 ES6 模块时，ES6 模块的所有输出接口都会成为输入对象的属性。
			- default 接口会变成 xxx.default 属性
			- 而且由于存在缓存机制，模块内部变量的变化没有在模块外部反映出来。

- 循环加载

	- 描述

		- "循环加载"(circular dependcy) 指的是，a 脚本的执行依赖 b 脚本，而 b 脚本的执行又依赖 a 脚本。

			- a.js:  var b = require('b');
			- b.js: var a = require('a');

		- 通常，"循环加载"表示存在强耦合，如果处理不好，还可能导致地柜加载，是的程序无法执行，因此应该避免出现这种现象。

	- CommonJS 模块的循环加载

		- 描述

			- CommonJS 模块的重要特性就是加载时执行，即脚本代码在 require 的时候就会全部执行。
			- 一旦出现某个模块被“循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。

		- 注

			- 由于 CommonJS 模块遇到循环加载时返回的是当前已经执行的部分的值，而不是代码全部执行之后的值，两者可能会有差异。所以，输入变量的时候必须非常小心。

	- ES6 模块的循环加载

		- 描述

			- ES6 模块的特性是动态引用
			- 如果使用 import 从一个模块中加载变量（即 import foo from 'foo'）, 那么，变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者保证在真正取值的时候能够取到值。

		- 注

			- 已经开始执行的模块，不会重复执行。
			- 由于 ES6 加载的变量都是动态引用其所在模块的。只要引用存在，代码就能执行。

### ES6 模块的转码

- Babel
- ES6 module transpiler

	- square 公司开源的转码器，可以将 ES6 模块转为 CommonJS 模块或 AMD 模块。

- SystemJS

	- 是一个垫片库（polyfill），可以在浏览器加载 ES6 模块、AMD 模块和 CommonJS 模块，将其转为 ES5 格式，在后台调用的是 Google 的 Traceur 转码器。

## Class

### 描述

- JavaScript 语言的传统方法是通过构造函数定义并生成对象
- ES6 中的 class 可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰，更像面对对象编程的语法而已。

### 基本语法

- 描述

	- 定义一个"类"，里面有一个 constructor 方法，这是构造方法，而 this 关键字则代表实例对象

	- 类的数据类型就是函数，类本身就指向构造函数。使用的时候也是直接对类使用 new 命令，跟构造函数的用法完全一致。

	- 构造函数的 prototype 属性在 ES6 的"类"上继续存在。事实上，类的所有方法都定义在类的 prototype 属性上。在类的实例上调用方法，其实就是调用原型上的方法。
	- 类的新方法可以添加在 prototype 对象上。Object.assign 方法可以很方便的一次向类添加多个方法。类的内部定义的所有方法都是不可枚举的(non-enumerable)。(可用Object,getOwnPropertyNames方法获取)
	- 与函数一样，Class也可以使用表达式的形式定义（const myClass = class { }），类的属性名可以采用表达式。

- 严格模式

	- 类和模块的内部默认使用严格模式，所所以不需要使用 use strict 指定运行模式。

- constructor 方法

	- 描述

		- constructor 方法是类的默认方法，通过 new 命令生成对象实例时自动调用该方法。一个类必须有 constructor 方法，如果没有显示定义，一个空的 constructor 方法会被默认添加。
		- constructor 方法默认返回实例对象（即 this），不过完全可以指定返回另一个对象。

- 类的实例对象

	- 与ES5一样，实例的属性除非显示定义在其本身（即 this 对象）上，否则都是定义在原型（即 Class）上，这也意味着可以通过实例的 __proto__ 属性为"类" 添加方法。

		- 注意：__proto__ 并不是语言本身的特性，而是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。

	- 与ES5一样，类的所有实例共享一个原型对象。

- 不存在变量提升

	- 类不存在变量提升(hoist)，这一点与 ES5 完全不同。
	- 这种规定的原因与类的继承有关，必须保证子类在父类之后定义。若存在 class 的提升，可能导致子类继承父类的时候，父类还没有定义。

- 私有方法和属性

	- 私有方法

		- 描述：私有方法是常见需求，但 ES6 不提供，只能通过变通方法来模拟实现。
		- 做法

			- 一，在命名上加以区别，以"_" 下划线表示这是一个只限于内部使用的私有方法，但是这种命名是不保险的，在类的外部依然可以调用这个方法。（this._foo() {}）
			- 二，索性将私有方法移除模块，因为模块内部的所有方法都是对外可见的。
			- 三，利用 Symbol 值的唯一性将私有方法的名字命名为一个 Symbol 值。

	- 私有属性

		- 描述：与私有方法一样，ES6 不支持私有属性。
		- 提案

			- 方法是在属性名前，用#来表示（#x），私有属性与实例的属性是可以同名的。
			- 之所以要引入一个新的前缀 # 来表示私有属性，而没有采用 private 关键字，是因为 JavaScript 是一门动态语言，使用独立的符号似乎是唯一可靠的方法。

- 静态方法和属性/实例属性

	- 静态方法

		- 类相当于实例的原型，所有在类中定义的方法都会被实例继承。如果在一个方法前加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类调用，称为 "静态方法" 。
		- 父类的静态方法可以被子类继承，静态方法也可从 super 对象上调用。

	- 静态属性和实例属性

		- 描述：静态属性值的是 Class 本身的属性名，即 Class.propnam，而不是定义在实例对象(this) 上的属性。
		- 静态属性

			- 类名.属性名；Foo.prop = 1;  Foo.prop;// 1
			- 上面的写法可以读/写 Foo 类的静态属性 prop
			- 注：目前只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

		- 提案

			- Class 实例属性可以用等式写入类的定义中（不用放在 构造方法 constructor{} 中。对于那些在 constructor 里面已经定义的实例属性，新写法允许直接列出；
			- Class 静态属性只要在实例属性的写法前面加上 static关键字就可以了。

- this 的指向

	- 类的方法内部如果含有 this, 它将默认指向类的实例，但是一旦脱离类单独使用该方法，很可能会报错。
	- 解决方法

		- 一，在构造方法中绑定 this，这样就不会出现 this 指向发生变化而引发的错误

			- constructor() { this.foo = this.foo.bind(this); }

		- 二，箭头函数
		- 三，使用 Proxy，在获取方法的时候自动绑定 this

- getter 和 setter

	- 与 ES5 一样，在"类"的内部可以使用 get 和 set 关键字对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
	- 存值函数和取值函数是设置在属性的 Descriptor 对象上的

- Generator 方法

	- 如果某个方法之前加上星号(*)，就表示该方法是一个 Generator 函数

- new.target 属性

	- 描述：new 是从构造函数生成实例的命令。ES6 为 new 命令引入了 new.target 属性，（在构造函数中）返回 new 命令所作用的构造函数。如果构造函数不是通过 new 命令调用的，那么 new.target 会返回 undefined，因此这个属性可以用于确定构造函数怎么调用的。
	- Class 内部调用 new.target，返回当前 Class
	- 注

		- 子类继承父类时 new.target 会返回子类。利用这个特点，可以写出不能独立使用而必须继承后才能使用的类。
		- 在函数外部，使用 new.target 会报错。

- 注

	- 定义"类"的方法时，前面不需要加上 function 这个保留字，直接把函数的定义放进去就可以了。另外，方法直接不需要逗号分隔，加了会报错。
	- 类必须使用 new 来调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。
	- 本质上，由于 ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 Class 继承，包括 name 属性（总是返回紧跟在 class 关键字后的类名）。

### Class 的继承

- 描述

	- Class 可以通过 extends 关键字实现继承，这比 ES5 通过修改原型链实现继承更加清晰和方便。

	- 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。

	- 注

		- 如果子类没有定义 constructor 方法，那么这个方法会被默认添加。
		- 在子类的构造函数中，置于调用 super 之后才可以使用 this 关键字，否则会报错。这是因为子类实例的构建是基于对父类实例的架构，只有super 方法才能返回实例。

- 继承的实质

	- ES5 的继承实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面(Parent.apply(this)。
	- ES6 的继承机制完全不同，实质是先创造父类的实例对象 this 所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

- Object.getPrototypeOf()

	- 该方法可以用来从子类上获取父类
	- 可以使用这个方法判断一个类是否继承了另一个类

- super 关键字

	- 使用方式

		- 第一种情况，super 作为函数调用时代表父类的构造函数。

			- ES6 要求，子类的构造函数必须执行一次 super 函数。作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
			- super 代表了父类A 的构造函数，但是返回的是子类 B 的实例,即 super 内部的 this 指的是 B，因此 super() 在这里相当于 A.prototype.constructor.call(this)。(可用 new.target 检验)。

		- 第二种情况，super 作为对象时在普通方法中指向父类的原型对象；在静态方法中指向父类。

			- 由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性是无法通过 super 调用的。
			- ES6 规定，通过 super 调用父类的方法时，super 会绑定子类的 this。(实际执行的是 super.xxx.call(this))。
			- 由于绑定子类的 this，因此如果通过 super 对某个属性赋值 super.x = xxx，这时 super 就是 this ，赋值的属性会变成子类实例的属性。  但是当读取 super.x 时，相当于读取的是 父类.prototype.x
			- 如果 super 作为对象用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象。

	- 注

		- 使用用 super 时，必须显示指定是作为函数还是作为对象使用，否则报错。
		- 由于对象总是继承其他对象的，所以可以在任意一个对象中使用 super 关键字

- 类的 prototype 属性和 __proto__ 属性

	- 描述

		- 在大多数浏览器的 ES5 实现之中，每一个对象都有 __proto__ 属性，指向对应的构造函数的 prototype 属性。
		- Class 作为构造函数的语法糖，同时有 prototype 属性和 __proto__属性，因此同时存在两条继承链。

			- 子类的 __proto__ 属性表示构造函数的继，总是指向父类。
			- 子类 prototype 属性的 __prototype__ 表示方法的继承，总是指向父类的 prototype 属性。
			- 原因：因为类的继承是按照左边的模式实现的。

			- 补充：Object.setPrototypeOf 方法的实现

		- 两条继承链可以这样理解: 作为一个对象，子类(B)的原型（__proto__属性）是父类(A)；作为一个构造函数，子类(B)的原型（prototype属性） 是父类的实例。

- extends 的继承目标

	- 描述

		- extends 关键字后面可以跟多种类型的值

	- 三种特殊情况

		- 子类继承 Object 类

			- 这种情况下，A 其实就是构造函数 Object 的复制，A 的实例就是 Object 的实例。

		- 不存在任何继承

			- 这种情况下，A作为一个基类(即不存在任何继承)就是一个普通函数，所以直接继承 Function.prortotype。但是，A 调用后返回一个空对象（即 Object 实例），所以 A.prototype.__proto__指向构造函数(Object)的 prototype 属性。

		- 子类继承 null

			- 这种情况与第二种情况非常。A 也是一个普通函数，所以直接继承 Function.prototype。但是，A 调用后返回的对象不继承任何方法，所以它的 __proto__ 指向 Function.prototype，即实质上执行了下面的代码。
- 实例的 __proto__ 属性

	- 子类型的__proto__的属性的__proto__属性指向父类实例的__proto__属性。也就是说，子类的原型的原型是父类的原型。
	- 因此，可以通过子类实例的__proto__.__proto__属性修改父类实例的行为。

- 原生构造函数的继承

	- ECMAScript 的原生构造函数

		- Boolean、Number()、String()、Array()、Date()、Function()、RegExp()、Error()、Object()
		- 以前，这些原生构造函数是无法继承的，是因为子类无法获得原生构造函数的内部属性，例如通过 Array.apply() 或者分配给原始对象(xxx.prototype = Object.create(Array.prototype);)。原生构造函数会忽略 apply(call) 方法传入的 this，也就是说，原生构造函数的 this 无法绑定，导致拿不到内部属性。
		- ES5 是先新建子类的实例对象 this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array 构造函数有一个内部属性 [[DefineOwnProperty]]，用来定义新属性时，更新 length 属性，这个内部属性便无法在子类获取，导致子类的 length 属性不正常。

	- ES6

		- ES6 允许继承原生构造函数定义子类，因为ES6 先新建父类的实例对象 this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承。ES6 可以自定义原生数据结构的子类，这是 ES5 无法做到的。
		- 另外 extends 关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的继承上定义自己的数据结构。

- Mixin 模式的实现

### 类的修饰器

- 描述：修饰器（Decorator）是一个函数，用来修改类的行为。ES2017引入

## Async

### 描述

- Generator函数的语法糖，使得异步操作更加方便，async 函数就是将 Generator 函数的星号（*）替换成 async，将 yield 替换成 await，async 函数的改进体现在以下四点：

	- 1. 内置执行器；Generator 函数的执行必须靠执行器，所以才有了 co 模块，而 async 函数自带执行器。也就是说，async 函数的执行和普通函数一模一样。
	- 2. 更好的语义；async 和 await 比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
	- 3. 更广的适用性；co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这是等同于同步操作）。
	- 4. 返回值是 Promise；async 函数的返回值是 Promise 对象。这比 Generator 函数的返回值是 Iterator 对象方便了许多，可以用 then 方法指定下一步的操作。

- 进一步说，async 函数完全可以看作是由多个异步操作包装而成的一个 Promise 对象，而 await 命令就是内部 then 命令的语法糖。

### 用法

- async 函数返回一个 Promise 对象，可以使用 then 方法添加一个回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成后，再接着执行函数体后面的语句。
- 使用形式

	- 函数声明：async function foo() {}
	- 函数表达式：const foo = async function () {};
	- 对象的方法：let obj = { async foo() {} };   obj.foo().then(...)
	- class 的方法：class Xxx { constructor(){} async xxx(){} };
	- 箭头函数：const foo = async () => {};

### 语法

- 返回 Promise 对象

	- async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。
	- async 函数内部抛出错误会导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到。

- Promise 对象的状态变化

	- aysnc 函数返回的 Promise 对象必须等到内部所有 await 命令后面的 Promise 对象执行完才会发生状态改变，除非遇到 return 语句或抛出错误。也就是说，只有 async 函数内部的异步操作执行完毕，才会执行 then 方法指定的回调函数。

- await 命令

	- 正常情况下，await 命令后面是一个 Promise 对象，若不是，则会被转成一个立即 resolve 的 Promise 对象。
	- await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到。
	- 只要一个 await 语句后面的 Promise 变为 reject，那么整个 async 函数都会中断执行。若希望即使前一个异步操作失败，也不要中断后面的异步操作的方法是：

		- 可以将第一个 await 放在 try...catch 结构里面，这样不管这个异步操作是否成功，第二个 await 都会执行。
		- await 后面的 Promise 对象添加一个 catch 方法，先处理前面可能出现的错误。

- 错误处理

	- 如果 await 后面的异步操作出错，那么等同于 async 函数返回的 Promise对象被 reject。

- 使用注意点

	- 因为await 命令后面的 Promise 对象的运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
	- 多个 await 命令后面的异步操作如果不存在继发关系，最好让它们同时触发。

		- forEach循环会使得 await 后面的操作并发执行，即同时执行，而不是继发执行，若要继发执行则使用 for 循环。
		- 希望多个请求并发执行，可以使用 Promise.all 方法

	- await 命令只能用在 async 函数之中，如果用在普通函数中就会报错。

### 与其他异步处理方法的比较

- Promise 写法虽然比回调函数的写法大大改进，但是代码完全是 Promise 的 API（theb、catch等），操作本身的语义反而不容易看出来
- Generator 函数语义比 Promise 写法更清晰，用户定义的操作会全部出现在 Generator 函数内部。但是，必须有一个任务执行器自动执行 Generator 函数。
- async 函数的实现最简洁，最符合语义，几乎没有与语义不相关的代码。它将 Generator 写法中的自动执行器改在语言层面提供，不暴露给用户，因此代码量最少。

### 实现原理

- async 函数的实现原理就是将 Generator 函数和自动执行器包装在一个函数里

### 实例

- 按顺序完成异步操作

### 异步遍历器

- 描述

	- 为y异步操作提供原生的遍历器接口，即 value 和 done 这两个属性都是异步产生的，这称为“异步遍历器”（Async Iterator）

*XMind: ZEN - Trial Version*