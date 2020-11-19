### 1. 避免使用 var，推荐使用 let、const

- 注：`let、const` 都是块级作用域

## 二、Object

### 1. 使用对象字面量创建对象：`{}`

### 2. 使用对象方法简写：`fn(){}`

### 3. 使用属性缩写，并将你的所有缩写放在对象声明的开始.

```js
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```

### 4. 只对那些无效的标示使用引号 `''`

```js
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

### 5. 不要直接调用`Object.prototype`上的方法

- 如`hasOwnProperty`, `propertyIsEnumerable`, `isPrototypeOf`。

```js
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // 在模块作用内做一次缓存
/* or */
import has from 'has'; // https://www.npmjs.com/package/has
// ...
console.log(has.call(object, key));
```

### 6. 对象浅拷贝时，更推荐使用扩展运算符[就是`...`运算符]

而不是 `Object.assign`。获取对象指定的几个属性时，用对象的rest解构运算符[也是`...`运算符]更好。

```js
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good es6扩展运算符 ...
const original = { a: 1, b: 2 };
// 浅拷贝
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

// rest 赋值运算符
const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

## 三、Arrays

### 1. 使用字面量赋值：`[]`

### 2. 使用 Array.push 代替直接向数组中添加一个值

### 3. 使用扩展运算符做数组浅拷贝，类似对象浅拷贝

```js
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

### 4. 用 `...` 运算符而不是`Array.from`来将一个可迭代的对象转换成数组。

```js
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

### 5. 用 `Array.from` 去将一个类数组对象转成一个数组。

```js
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// bad
const arr = Array.prototype.slice.call(arrLike);

// good
const arr = Array.from(arrLike);
```

### 6. 使用 `Array.from` 而不是 `...` 运算符去做map遍历。

**因为这样可以避免创建一个临时数组**

```js
// bad
const baz = [...foo].map(bar);

// good
const baz = Array.from(foo, bar);
```

### 7. 在数组方法的回调函数中使用 return 语句。 如果函数体由一条返回一个表达式的语句组成， 并且这个表达式没有副作用， 这个时候可以忽略return

```js
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good 函数只有一个语句
[1, 2, 3].map(x => x + 1);

// bad - 没有返回值， 因为在第一次迭代后acc 就变成undefined了
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
});

// good
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```

### 8. 如果一个数组有很多行，在数组的 `[` 后和 `]` 前断行。 请看下面示例

```js
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```

## 四、Destructuring（解构）

### 1. 用对象的解构赋值来获取和使用对象某个或多个属性

```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

### 2. 使用数组解构

```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

### 3. 多个返回值用对象的解构，而不是数组解构

```js
// bad
function processInput(input) {
  // 然后就是见证奇迹的时刻
  return [left, right, top, bottom];
}

// 调用者需要想一想返回值的顺序
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // oops， 奇迹又发生了
  return { left, right, top, bottom };
}

// 调用者只需要选择他想用的值就好了
const { left, top } = processInput(input);
```

## 五、Strings

### 1. 对 String 用单引号 ''

### 2. 超过 100 个字符的字符串不应该用 String 串联成多行

### 3. 用字符串模板而不是字符串拼接来组织可编程字符串

### 4. 永远不要在字符串中用 `eval()`

### 5. 不要使用不必要的转义字符

## 六、Functions

### 1. 用命名函数表达式而不是函数声明

函数表达式： `const func = function () {}`

函数声明： `function func() {}`

Why? 函数声明时作用域被提前了

### 2. 把立即执行函数包裹在圆括号里

> Why? immediately invoked function expression = IIFE Why? 一个立即调用的函数表达式是一个单元 - 把它和他的调用者（圆括号）包裹起来，在括号中可以清晰的地表达这些。 Why? 注意：在模块化世界里，你几乎用不着 IIFE

```js
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());
```

### 3. 不要在非函数块（if、while） 内声明函数

### 4. 不要使用 `arguments` 命名参数。

**它的优先级高于每个函数作用域自带的 `arguments`对象，这会导致函数自带的 `arguments` 值被覆盖**

### 5. 不要使用 `arguments` ，用 rest 语法 `...`

Why? `...`明确你想用那个参数。而且rest参数是真数组，而不是类似数组的`arguments`

```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

### 6. 用默认参数语法而不是在函数里对参数重新赋值

```js
// really bad
function handleThings(opts) {
  // 不， 我们不该改arguments
  // 第二： 如果 opts 的值为 false, 它会被赋值为 {}
  // 虽然你想这么写， 但是这个会带来一些细微的bug
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

### 7. 默认参数避免副作用

> Why? 他会令人迷惑不解， 比如下面这个， a到底等于几， 这个需要想一下。

```js
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```

###  8. 把默认参数赋值放在最后

```js
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

### 9. 不要用函数构造器创建函数

> Why? 以这种方式创建函数将类似于字符串 eval()，这会打开漏洞。

```js
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');
```

### 10. 函数签名部分要有空格。

Why? 统一性好，而且在你添加/删除一个名字的时候不需要添加/删除空格

```js
// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a() {};
```

### 11. 不要改参数

 Why? 操作参数对象对原始调用者会导致意想不到的副作用。 就是不要改参数的数据结构，保留参数原始值和数据结构。

```js
// bad
function f1(obj) {
  obj.key = 1;
};

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
};
```

### 12. 不要对参数重新赋值

Why? 参数重新赋值会导致意外行为，尤其是对 `arguments`。这也会导致优化问题，特别是在V8里

```js
// bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}

// good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}
```

### 13. 用`spread`操作符`...`去调用多变的函数更好

Why? 这样更清晰，你不必提供上下文，而且你不能轻易地用`apply`来组成`new`

```js
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
const x = [1, 2, 3, 4, 5];
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);
```

## 七、Arrow Functions（箭头函数）

### 1. 当你一定要用函数表达式（在回调函数里）的时候就用箭头表达式吧

- Why? 他创建了一个`this`的当前执行上下文的函数的版本，这通常就是你想要的；而且箭头函数是更简洁的语法

- Why? 什么时候不用箭头函数： 如果你有一个相当复杂的函数，你可能会把这个逻辑移出到他自己的函数声明里。

```js
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

### 2. 如果函数体由一个没有副作用的表达式语句组成，删除大括号和return。否则，继续用大括号和 `return` 语句

Why? 语法糖，当多个函数链在一起的时候好读

```js
// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map(number => `A string containing the ${number}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map((number, index) => ({
  [index]: number
}));

// 表达式有副作用就不要用隐式return
function foo(callback) {
  const val = callback();
  if (val === true) {
    // Do something if callback returns true
  }
}

let bool = false;

// bad
// 这种情况会return bool = true, 不好
foo(() => bool = true);

// good
foo(() => {
  bool = true;
});
```

### 3. 万一表达式涉及多行，把他包裹在圆括号里更可读。

Why? 这样清晰的显示函数的开始和结束

```js
// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
);

// good
['get', 'post', 'put'].map(httpMethod => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod
  )
));
```

### 4. 如果你的函数只有一个参数并且函数体没有大括号，就删除圆括号。否则，参数总是放在圆括号里。 

Why? 这样少一些混乱， 其实没啥语法上的讲究，就保持一个风格。

```js
// bad
[1, 2, 3].map((x) => x * x);

// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

###  5. 在隐式return中强制约束函数体的位置， 就写在箭头后面。

```js
// bad
(foo) =>
  bar;

(foo) =>
  (bar);

// good
(foo) => bar;
(foo) => (bar);
(foo) => (
   bar
)
```

## 八、Classes & Constructors

### 1. 常用`class`，避免直接操作`prototype`

Why? `class`语法更简洁更易理解

```js
// bad
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};


// good
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

### 2. 用`extends`实现继承

Why? 它是一种内置的方法来继承原型功能而不打破`instanceof`

```js
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function () {
  return this.queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this.queue[0];
  }
}
```

### 3. 方法可以返回`this`来实现方法链

```js
// bad
Jedi.prototype.jump = function () {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function (height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);
```

###  4. 写一个定制的toString()方法是可以的，只要保证它是可以正常工作且没有副作用的

```js
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```

### 5. 如果没有具体说明，类有默认的构造方法。一个空的构造函数或只是代表父类的构造函数是不需要写的。

```js
// bad
class Jedi {
  constructor() {}

  getName() {
    return this.name;
  }
}

// bad
class Rey extends Jedi {
  // 这种构造函数是不需要写的
  constructor(...args) {
    super(...args);
  }
}

// good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = 'Rey';
  }
}
```

###  6. 除非外部库或框架需要使用特定的非静态方法，否则类方法应该使用`this`或被做成静态方法。 作为一个实例方法应该表明它根据接收者的属性有不同的行为。

```js
// bad
class Foo {
  bar() {
    console.log('bar');
  }
}

// good - this 被使用了
class Foo {
  bar() {
    console.log(this.bar);
  }
}

// good - constructor 不一定要使用this
class Foo {
  constructor() {
    // ...
  }
}

// good - 静态方法不需要使用 this
class Foo {
  static bar() {
    console.log('bar');
  }
}
```

## 九、Modules

### 1. 用(`import`/`export`) 模块而不是无标准的模块系统。你可以随时转到你喜欢的模块系统。

Why? 模块化是未来，让我们现在就开启未来吧。

```js
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

### 2. 不要用import通配符， 就是 `*` 这种方式

Why? 这确保你有单个默认的导出

```js
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

### 3. 不要直接从import中直接export

Why? 虽然一行是简洁的，有一个明确的方式进口和一个明确的出口方式来保证一致性。

```js
// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

### 4. 一个路径只 import 一次

Why? 从同一个路径下import多行会使代码难以维护

```js
// bad
import foo from 'foo';
// … some other imports … //
import { named1, named2 } from 'foo';

// good
import foo, { named1, named2 } from 'foo';

// good
import foo, {
  named1,
  named2,
} from 'foo';
```

### 5. 不要导出可变的东西

Why? 变化通常都是需要避免，特别是当你要输出可变的绑定。虽然在某些场景下可能需要这种技术，但总的来说应该导出常量。

```js
// bad
let foo = 3;
export { foo }

// good
const foo = 3;
export { foo }
```

### 6. 在一个单一导出模块里，用 `export default` 更好

Why? 鼓励使用更多文件，每个文件只做一件事情并导出，这样可读性和可维护性更好。

```js
// bad
export function foo() {}

// good
export default function foo() {}
```

### 7. `import` 放在其他所有语句之前。 

Why? 让`import`放在最前面防止意外行为。

```js
// bad
import foo from 'foo';
foo.init();

import bar from 'bar';

// good
import foo from 'foo';
import bar from 'bar';

foo.init();
```

### 8. 多行import应该缩进，就像多行数组和对象字面量

Why? 花括号与样式指南中每个其他花括号块遵循相同的缩进规则，逗号也是。

```js
// bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

// good
import {
  longNameA,
  longNameB,
  longNameC,
  longNameD,
  longNameE,
} from 'path';
```

### 9. 在import语句里不允许Webpack loader语法

Why? 一旦用Webpack语法在import里会把代码耦合到模块绑定器。最好是在`webpack.config.js`里写webpack loader语法

## 十. Iterators and Generators（迭代器和生成器）

### 1. 不要用遍历器。用JavaScript高级函数代替`for-in`、 `for-of`。

- Why? 这强调了我们不可变的规则。 处理返回值的纯函数比副作用更容易。

- Why? 用数组的这些迭代方法： `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / ... , 用对象的这些方法 `Object.keys()` / `Object.values()` / `Object.entries()` 去产生一个数组， 这样你就能去遍历对象了。

```js
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;

// good
let sum = 0;
numbers.forEach(num => sum += num);
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;

// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) {
  increasedByOne.push(numbers[i] + 1);
}

// good
const increasedByOne = [];
numbers.forEach(num => increasedByOne.push(num + 1));

// best (keeping it functional)
```

### 2. 现在不要用generator

Why? 它在es5上支持的不好

### 3. 如果你一定要用, 请确保它们的函数签名空格是得当的。

Why? `function` 和 `*` 是同一概念关键字 - `*`不是`function`的修饰符，`function*`是一个和`function`不一样的独特结构

```js
// bad
function * foo() {
  // ...
}

// bad
const bar = function * () {
  // ...
}

// bad
const baz = function *() {
  // ...
}

// bad
const quux = function*() {
  // ...
}

// bad
function*foo() {
  // ...
}

// bad
function *foo() {
  // ...
}

// very bad
function
*
foo() {
  // ...
}

// very bad
const wat = function
*
() {
  // ...
}

// good
function* foo() {
  // ...
}

// good
const foo = function* () {
  // ...
}
```

## 十一. Properties

### 1. 访问属性时使用点符号`. `

```js
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

### 2. 当获取的属性是变量时用方括号`[]`取

```js
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```

### 3. 做幂运算时用幂操作符 `**`

```js
// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;
```

## 十二. Variables

### 1. 用`const`或`let` 声明变量。不这样做会导致全局变量，避免污染全局命名空间

```js
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```

### 2. 每一个变量都用一个 `const` 或 `let`

Why? 这种方式很容易去声明新的变量，你不用去考虑把`;`调换成`,`，或者引入一个只有标点的不同的变化。这种做法也可以是你在调试的时候单步每个声明语句，而不是一下跳过所有声明。

```js
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

### 3. `const`放一起，`let`放一起

Why? 在你需要分配一个新的变量， 而这个变量依赖之前分配过的变量的时候，这种做法是有帮助的。

```js
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

###  4. 在你需要的地方声明变量，但是要放在合理的位置

Why? `let` 和 `const` 都是块级作用域而不是函数级作用域

```js
// bad - unnecessary function call
function checkName(hasName) {
  const name = getName();

  if (hasName === 'test') {
    return false;
  }

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}

// good
function checkName(hasName) {
  if (hasName === 'test') {
    return false;
  }

  // 在需要的时候分配
  const name = getName();

  if (name === 'test') {
    this.setName('');
    return false;
  }

  return name;
}
```

### 5. 不要使用链接变量分配

Why? 链接变量分配创建隐式全局变量。

```js
// bad
(function example() {
  // JavaScript 将这一段解释为
  // let a = ( b = ( c = 1 ) );
  // let 只对变量 a 起作用; 变量 b 和 c 都变成了全局变量
  let a = b = c = 1;
}());

console.log(a); // undefined
console.log(b); // 1
console.log(c); // 1

// good
(function example() {
  let a = 1;
  let b = a;
  let c = a;
}());

console.log(a); // undefined
console.log(b); // undefined
console.log(c); // undefined

// `const` 也是如此
```

### 6. 不要使用一元自增自减运算符（`++`， `--`）

Why? 根据eslint文档，一元增量和减量语句受到自动分号插入的影响，并且可能会导致应用程序中的值递增或递减的无声错误。 使用`num + = 1`而不是`num ++`或`num ++`语句来表达你的值也是更有表现力的。 禁止一元增量和减量语句还会阻止您无意地预增/预减值，这也会导致程序出现意外行为。

```js
// bad

  const array = [1, 2, 3];
  let num = 1;
  num++;
  --num;

  let sum = 0;
  let truthyCount = 0;
  for (let i = 0; i < array.length; i++) {
    let value = array[i];
    sum += value;
    if (value) {
      truthyCount++;
    }
  }

  // good

  const array = [1, 2, 3];
  let num = 1;
  num += 1;
  num -= 1;

  const sum = array.reduce((a, b) => a + b, 0);
  const truthyCount = array.filter(Boolean).length;
```

### 7. 在赋值的时候避免在 `=` 前/后换行。 如果你的赋值语句超出`max-len`， 那就用小括号把这个值包起来再换行。

Why? 在 `=` 附近换行容易混淆这个赋值语句。

```js
// bad
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();

// bad
const foo
  = 'superLongLongLongLongLongLongLongLongString';

// good
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);

// good
const foo = 'superLongLongLongLongLongLongLongLongString';
```

### 8. 不允许有未使用的变量

Why? 一个声明了但未使用的变量更像是由于重构未完成产生的错误。这种在代码中出现的变量会使阅读者迷惑。

```js
// bad

var some_unused_var = 42;

// 写了没用
var y = 10;
y = 5;

// 变量改了自己的值，也没有用这个变量
var z = 0;
z = z + 1;

// 参数定义了但未使用
function getX(x, y) {
    return x;
}

// good
function getXPlusY(x, y) {
  return x + y;
}

var x = 1;
var y = a + 2;

alert(getXPlusY(x, y));

// 'type' 即使没有使用也可以可以被忽略， 因为这个有一个 rest 取值的属性。
// 这是从对象中抽取一个忽略特殊字段的对象的一种形式
var { type, ...coords } = data;
// 'coords' 现在就是一个没有 'type' 属性的 'data' 对象
```

## 十三. Hoisting

### 1. `var`声明会被提前到他的作用域的最前面，它分配的值还没有提前`const` 和 `let`被赋予了新的调用概念 `暂时性死区（TDZ）` 。 重

- 要的是要知道为什么 **typeof不再安全**？

  - 与通过 `var` 声明的变量，有初始化值 `undefined` 和只是未声明的变量不同的是，如果使用 `typeof` 检测在暂时性死区中的变量，会抛出 `ReferenceError` 异常：

    ```js
    // prints out 'undefined'
    console.log(typeof undeclaredVariable);
    
    // results in a 'ReferenceError'
    console.log(typeof i);
    let i = 10;
    ```

```js
// 我们知道这个不会工作，假设没有定义全局的notDefined
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// 在你引用的地方之后声明一个变量，他会正常输出是因为变量作用域上升。
// 注意： declaredButNotAssigned的值没有上升
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// 解释器把变量声明提升到作用域最前面，
// 可以重写成如下例子， 二者意义相同
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// 用 const， let就不一样了
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```

### 2. 匿名函数表达式和 `var` 情况相同

```js
function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  var anonymous = function () {
    console.log('anonymous function expression');
  };
}
```

### 3. 函数声明则提升了函数名和函数体

```js
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}
```

## 十四. Comparison Operators & Equality

### 1. 用 `===` 和 `!==` 而不是 `==` 和 `!=`

### 2. 条件语句如'if'语句使用强制`ToBoolean'抽象方法来评估它们的表达式，并且始终遵循以下简单规则：

- **Object** 计算成 **true**
- **Undefined** 计算成 **false**
- **Null** 计算成 **false**
- **Booleans** 计算成 **the value of the boolean**
- **Numbers**
  - **+0，-0 or NaN** 计算成 **false**
  - 其他 **true**
- Strings 
  - `''` 计算成 **false**
  - 其他 **true**

```js
if ([0] && []) {
  // true
  // 数组（即使是空数组）是对象，对象会计算成true
}
```

### 3. 布尔值用缩写，而字符串和数字要明确比较对象

```js
// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== '') {
  // ...
}

// bad
if (collection.length) {
  // ...
}

// good
if (collection.length > 0) {
  // ...
}
```

###  4. 在`case`和`default`分句里用大括号创建一块包含语法声明的区域(e.g. `let`, `const`, `function`, and `class`).

Why? 语法声明在整个`switch`的代码块里都可见，但是只有当其被分配后才会初始化，他的初始化时当这个`case`被执行时才产生。 当多个`case`分句试图定义同一个事情时就出问题了

```js
// bad
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {
      // ...
    }
    break;
  default:
    class C {}
}

// good
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {
      // ...
    }
    break;
  }
  case 4:
    bar();
    break;
  default: {
    class C {}
  }
}
```

### 5. 三元表达式不应该嵌套，通常是单行表达式。

```js
// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// better
const maybeNull = value1 > value2 ? 'baz' : null;

const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const maybeNull = value1 > value2 ? 'baz' : null;

const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
```

### 6. 用圆括号来混合这些操作符。 只有当标准的算术运算符(`+`, `-`, `*`, & `/`)， 并且它们的优先级显而易见时，可以不用圆括号括起来。

Why? 这提高了可读性，并且明确了开发者的意图

```js
// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;

// bad
const bar = a ** b - 5 % d;

// bad
// 别人会陷入(a || b) && c 的迷惑中
if (a || b && c) {
  return d;
}

// good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

// good
const bar = (a ** b) - (5 % d);

// good
if (a || (b && c)) {
  return d;
}

// good
const bar = a + b / c * d;
```

## 十五. Blocks

### 1. 用大括号包裹多行代码块。

```js
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function foo() { return false; }

// good
function bar() {
  return false;
}
```

### 2. `if`表达式的`else`和`if`的关闭大括号在一行。

```js
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```

###  3. 如果 `if` 语句中总是需要用 `return` 返回， 那后续的 `else` 就不需要写了。 `if` 块中包含 `return`， 它后面的 `else if` 块中也包含了 `return`， 这个时候就可以把 `return` 分到多个 `if` 语句块中。

```js
// bad
function foo() {
  if (x) {
    return x;
  } else {
    return y;
  }
}

// bad
function cats() {
  if (x) {
    return x;
  } else if (y) {
    return y;
  }
}

// bad
function dogs() {
  if (x) {
    return x;
  } else {
    if (y) {
      return y;
    }
  }
}

// good
function foo() {
  if (x) {
    return x;
  }

  return y;
}

// good
function cats() {
  if (x) {
    return x;
  }

  if (y) {
    return y;
  }
}

// good
function dogs(x) {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}
```

## 十六、Control Statements

### 1. 当你的控制语句(`if`, `while` 等)太长或者超过最大长度限制的时候， 把每一个(组)判断条件放在单独一行里。 逻辑操作符放在行首。

```js
// bad
if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
  thing1();
}

// bad
if (foo === 123 &&
  bar === 'abc') {
  thing1();
}

// bad
if (foo === 123
  && bar === 'abc') {
  thing1();
}

// bad
if (
  foo === 123 &&
  bar === 'abc'
) {
  thing1();
}

// good
if (
  foo === 123
  && bar === 'abc'
) {
  thing1();
}

// good
if (
  (foo === 123 || bar === 'abc')
  && doesItLookGoodWhenItBecomesThatLong()
  && isThisReallyHappening()
) {
  thing1();
}

// good
if (foo === 123 && bar === 'abc') {
  thing1();
}
```

### 2. 不要用选择操作符代替控制语句

```js
// bad
!isRunning && startRunning();

// good
if (!isRunning) {
  startRunning();
}
```

## 十七、Comments

### 1. 多行注释用 `/** ... */`

### 2. 单行注释用`//`，将单行注释放在被注释区域上面。如果注释不是在第一行，那么注释前面就空一行

###  3. 所有注释开头空一个，方便阅读

### 4. 在你的注释前使用`FIXME'或`TODO'前缀， 这有助于其他开发人员快速理解你指出的需要重新访问的问题， 或者您建议需要实现的问题的解决方案。 这些不同于常规注释，因为它们是可操作的。 动作是`FIXME： - 需要计算出来`或`TODO： - 需要实现`

### 5. 用`// FIXME:`给问题做注释

### 6. 用`// TODO:`去注释问题的解决方案

## 十八、Whitespace

###  1. tab用两个空格

```js
// bad
function foo() {
∙∙∙∙const name;
}

// bad
function bar() {
∙const name;
}

// good
function baz() {
∙∙const name;
}
```

### 2. 在大括号前空一格

```js
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
```

### 3. 在控制语句(`if`, `while` 等)的圆括号前空一格。在函数调用和定义时，参数列表和函数名之间不空格。

### 4. 用空格来隔开运算符

### 5. 文件结尾空一行

###  6. 当出现长的方法链（>2个）时用缩进。用点开头强调该行是一个方法调用，而不是一个新的语句

```js
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
  find('.selected').
    highlight().
    end().
  find('.open').
    updateCount();

// good
$('#items')
  .find('.selected')
    .highlight()
    .end()
  .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
  .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
  .append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);

// good
const leds = stage.selectAll('.led').data(data);
```

### 7. 在一个代码块后下一条语句前空一行

```js
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;

// bad
const arr = [
  function foo() {
  },
  function bar() {
  },
];
return arr;

// good
const arr = [
  function foo() {
  },

  function bar() {
  },
];

return arr;
```

### 8. 不要用空白行填充块

### 9. 不要在代码之间使用多个空白行填充

### 10. 圆括号里不要加空格

### 11. 方括号里不要加空格

### 12. 花括号里加空格

### 13. 避免一行代码超过100个字符

###  14. 作为语句的花括号内也要加空格

### 15. `,` 前不要空格， `,` 后需要空格

### 16. 计算属性内要空格。参考上述花括号和中括号的规则

### 17. 调用函数时，函数名和小括号之间不要空格

### 18. 在对象的字面量属性中， `key` `value` 之间要有空格

### 19. 行末不要空格

### 20. 避免出现多个空行。 在文件末尾只允许空一行

## 十九、Commas

### 1. 不要前置逗号

### 2.额外结尾逗号

## 二十、Semicolons

Why? 当 JavaScript 遇到没有分号结尾的一行，它会执行[自动插入分号 `Automatic Semicolon Insertion`](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)这一规则来决定行末是否加分号。如果JavaScript在你的断行里错误的插入了分号，就会出现一些古怪的行为。当新的功能加到JavaScript里后， 这些规则会变得更复杂难懂。显示的结束语句，并通过配置代码检查去捕获没有带分号的地方可以帮助你防止这种错误。

```js
// bad
(function () {
  const name = 'Skywalker'
  return name
})()

// good
(function () {
  const name = 'Skywalker';
  return name;
}());

// good, 行首加分号，避免文件被连接到一起时立即执行函数被当做变量来执行。
;(() => {
  const name = 'Skywalker';
  return name;
}());
```

## 二十一、Type Casting & Coercion

### 1.  在语句开始执行强制类型转换。

### 2. Strings

```js
// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // 不保证返回string

// good
const totalScore = String(this.reviewScore);
```

### 3. Numbers: 用 `Number` 做类型转换，`parseInt`转换string常需要带上基数

### 4. 请在注释中解释为什么要用移位运算和你在做什么。无论你做什么狂野的事，比如由于 `parseInt` 是你的性能瓶颈导致你一定要用移位运算。 请说明这个是因为[性能原因](https://jsperf.com/coercion-vs-casting/3),

```js
// good
/**
 * parseInt是代码运行慢的原因
 * 用Bitshifting将字符串转成数字使代码运行效率大幅增长
 */
const val = inputValue >> 0;
```

### 5. **注意:** 用移位运算要小心. 数字使用[64-位](https://es5.github.io/#x4.3.19)表示的，但移位运算常常返回的是32为整形[source](https://es5.github.io/#x11.7))。移位运算对大于32位的整数会导致意外行为。[Discussion](https://github.com/airbnb/javascript/issues/109). 最大的32位整数是 2,147,483,647:

### 6. 布尔

```js
const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// best
const hasAge = !!age;
```

## 二十二、Naming Conventions

### 1. 避免用一个字母命名，让你的命名可描述

###  2. 用小驼峰式命名你的对象、函数、实例

###  3. 用大驼峰式命名类

### 4. 不要用前置或后置下划线

Why? JavaScript 没有私有属性或私有方法的概念。尽管前置下划线通常的概念上意味着“private”，事实上，这些属性是完全公有的，因此这部分也是你的API的内容。这一概念可能会导致开发者误以为更改这个不会导致崩溃或者不需要测试。 如果你想要什么东西变成“private”，那就不要让它在这里出现。

```JS
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';

// good
this.firstName = 'Panda';
```

### 5. 不要保存引用`this`， 用箭头函数或[函数绑定](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

```JS
// bad
function foo() {
  const self = this;
  return function () {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function () {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```

### 6. export default导出模块A，则这个文件名也叫A.*， import 时候的参数也叫A。 大小写完全一致

### 7. 当你export-default一个函数时，函数名用小驼峰，文件名需要和函数名一致

### 8. 当你export一个结构体/类/单例/函数库/对象 时用大驼峰。

### 9. 简称和缩写应该全部大写或全部小写。

### 10. 你可以用全大写字母设置静态变量，他需要满足三个条件。

1. 导出变量
2. 是 `const` 定义的， 保证不能被改变
3. 这个变量是可信的，他的子属性都是不能被改变的

Why? 这是一个附加工具，帮助开发者去辨识一个变量是不是不可变的。

- 对于所有的 `const` 变量呢？ —— 这个是不必要的。大写变量不应该在同一个文件里定义并使用， 它只能用来作为导出变量。 赞同！
- 那导出的对象呢？ —— 大写变量处在export的最高级(e.g. `EXPORTED_OBJECT.key`) 并且他包含的所有子属性都是不可变的。

```JS
// bad
const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

// bad
export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

// bad
export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

// ---

// 允许但不够语义化
export const apiKey = 'SOMEKEY';

// 在大多数情况下更好
export const API_KEY = 'SOMEKEY';

// ---

// bad - 不必要的大写键，没有增加任何语言
export const MAPPING = {
  KEY: 'value'
};

// good
export const MAPPING = {
  key: 'value'
};
```

## 二十三、Accessors

### 1. 不需要使用属性的访问器函数。

### 2. 不要使用JavaScript的getters/setters，因为他们会产生副作用，并且难以测试、维护和理解。相反的，你可以用 getVal()和setVal('hello')去创造你自己的accessor函数

```js
// bad
class Dragon {
  get age() {
    // ...
  }

  set age(value) {
    // ...
  }
}

// good
class Dragon {
  getAge() {
    // ...
  }

  setAge(value) {
    // ...
  }
}
```

### 3. 如果属性/方法是`boolean`， 用 `isVal()` 或 `hasVal()`

### 4. 用get()和set()函数是可以的，但是要一起用

## 二十三、Events

### 通过哈希而不是原始值向事件装载数据时(不论是DOM事件还是像Backbone事件的很多属性)。 这使得后续的贡献者（程序员）向这个事件装载更多的数据时不用去找或者更新每个处理器。例如：

```js
// bad
$(this).trigger('listingUpdated', listing.id);

// ...

$(this).on('listingUpdated', (e, listingID) => {
  // do something with listingID
});
```

prefer:

```js
// good
$(this).trigger('listingUpdated', { listingID: listing.id });

// ...

$(this).on('listingUpdated', (e, data) => {
  // do something with data.listingID
});
```

## 二十四、jQuery

###  1. jQuery对象用`$`变量表示

```js
// bad
const sidebar = $('.sidebar');

// good
const $sidebar = $('.sidebar');

// good
const $sidebarBtn = $('.sidebar-btn');
```

### 2. 暂存jQuery查找

```js
// bad
function setSidebar() {
  $('.sidebar').hide();

  // ...

  $('.sidebar').css({
    'background-color': 'pink'
  });
}

// good
function setSidebar() {
  const $sidebar = $('.sidebar');
  $sidebar.hide();

  // ...

  $sidebar.css({
    'background-color': 'pink'
  });
}
```

### 3. DOM查找用层叠式`$('.sidebar ul')` 或 父节点 > 子节点 `$('.sidebar > ul')`

### 4. 用jQuery对象查询作用域的`find`方法查询

```js
// bad
$('ul', '.sidebar').hide();

// bad
$('.sidebar').find('ul').hide();

// good
$('.sidebar ul').hide();

// good
$('.sidebar > ul').hide();

// good
$sidebar.find('ul').hide();
```

