# 一、JS 数据类型

## 概念篇

### 1. JS 原始数据类型有哪些？ 引用数据类型有哪些？

在 JS 中，存在着 7 种原始值（基本数据类型），分别是：

- `boolean`
- `null`
- `undefined`
- `number`
- `string`
- `symbol`（ES6 的符号）
- `bigint`（未发布）

引用数据类型：对象（Object）——普通对象-`Object`，数组对象-`Array`，正则对象-`RegExp`，日期对象-`Date`，数学函数-`Math`，函数对象-`Function`。

### 2. 说出下面运行的结果，解释原因。

```js
function test(person) {
  person.age = 26
  person = {
    name: 'hzj',
    age: 18
  }
  return person
}
const p1 = {
  name: 'fyq',
  age: 19
}
const p2 = test(p1)
console.log(p1) // -> p1：{name: “fyq”, age: 26}
console.log(p2) // -> p2：{name: “hzj”, age: 18}
```

解析：在函数传参的时候，传递的是对象在堆中的内存地址值，`test` 函数中的实参 `person` 是 `p1` 对象的内存地址，通过调用 `person.age = 26` 确实改变了 `p1` 的值，但随后 `person` 指向了另一块内存空间的地址，并且在最后将这另一块内存空间的地址返回，赋给了 `p2`。

**补充**：**基本类型的变量是存放在栈区的，引用类型的存储需要内存的栈区和堆区共同完成，栈区内存保存遍历标识符和指向对象在堆内存的地址。**

### 3. null 是对象吗？为什么？

答：`null` 不是对象

解析：虽然 `typeof null` 会输出 `object`，但是这只是 JS 存在已久的 BUG。在 JS 最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object`。

### 4. '1'.toString() 为什么可以调用？

其实在这个语句运行的过程中做了这样几件事情：

```js
var s = new Object('1');
s.toString();
s = null;
```

第一步：创建 `Object` 类实例，注意为什么不是 `String`？由于 `Symbol` 和 `BigInt` 的出现，对它们调用 `new` 都会报错，目前 ES6 规范也不建议用 new 来创建基本类的包装类。

第二步，调用实例方法。

第三步：执行完方法立即销毁这个实例。

整个过程提现了 **基本包装类型** 的性质，而基本包装类型恰恰属于基本数据类型，包括 `Boolean`、`Number` 和 `String`。

> 参考:《JavaScript高级程序设计(第三版)》P118

### 5. 0.1 + 0.2 为什么不等于 0.3 ？

二进制浮点数中的 0.1 和 0.2 并不是十分精确，0.1 和 0.2 在转换成二进制后会无限循环，由于标准位数的限制，后面多余的位数会被截断，此时就出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字就会变成 0.30000000000000004，所以条件判断为 false。

**解决方案**：

设置一个误差范围：在 JS 中这个值通常是 **2^52** ，从 ES6 开始，该值定义在 Number.EPSILON 中。

```js
function numberErrorRange(n1, n2){
    // 兼容 ES6 之前
    if(!Number.EPSILON){
        Number.EPSILON = Math.pow(2, -52);
    }
    return Math.abs( n1 - n2 ) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;

numberErrorRange(a, b);
```

### 6. 如何理解 BigInt ？

**什么是 BigInt ？**

> BigInt 是一种新的数据类型，用于当整数值大于 Number 数据类型支持的范围时。这种数据类型允许我们安全地对 **大整数** 执行算术操作，表示高分辨率的时间戳，使用大整数 id，等等，而不需要使用库。

**为什么需要 BigInt ？**

在 JS 中，所有的数字都以双精度 64 位浮点格式表示，那这样会带来什么问题呢？

这导致 JS 中的 Number 无法精确表示非常常大的整数，它会将非常大的整数四舍五入，确切地说，JS 中的 Number 类型只能安全地表示 `-9007199254740991(-(2^53-1))` 和 `9007199254740991（(2^53-1)）`，任何超出此范围的整数值都可能失去精度。

```js
console.log(999999999999999);  //=>10000000000000000
```

同时也会有一定的安全性问题:

```js
9007199254740992 === 9007199254740993;    // → true 居然是true!
```

**如何创建并使用 BigInt ？**

一：只需要在数字末尾追加 n 即可。

```
console.log( 9007199254740995n );    // → 9007199254740995n	
console.log( 9007199254740995 );     // → 9007199254740996
```

二：另一种创建 BigInt 的方法是用 `BigInt()` 构造函数（不能使用 new 调用）

```js
BigInt("9007199254740995");    // → 9007199254740995n
```

注意：

1. BigInt 不支持一元加号运算符，这可能是某些程序可能依赖于 + 始终生成 Number 的不变量，或者抛出异常。另外，更改 + 的行为也会破坏 asm.js代码。
2. 因为隐式类型转换可能丢失信息，所以不允许在 bigInt 和 Number 之间进行混合操作。当混合使用大整数和浮点数，结果值可能无法由 BigInt 或 Number 精确表示。
3. 不能将BigInt传递给Web api和内置的 JS 函数，这些函数需要一个 Number 类型的数字。尝试这样做会报TypeError错误。
4. 当 Boolean 类型与 BigInt 类型相遇时，BigInt的处理方式与Number类似，换句话说，只要不是0n，BigInt就被视为truthy的值。
5. 元素都为BigInt的数组可以进行sort。
6. BigInt可以正常地进行位运算，如|、&、<<、>>和^。



## 检测篇

### 1. typeof 是否能正确判断类型？

对于原始类型来说，除了 null 都可以调用 `typeof` 显示正确的类型。

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
```

但对于引用数据类型，除了函数之外，都会显示 "object"。

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

因此采用 `typeof` 判断对象数据类型是不合适的，采用 `instanceof` 会更好，`instanceof` 的原理是基于原型链的查询，只要处于原型链中，判断永远为 `true`。

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str1 = 'hello world'
str1 instanceof String // false

var str2 = new String('hello world')
str2 instanceof String // true
```

### 2. instanceof 能否判断基本数据类型？

能。比如下面这种方式:

```js
class PrimitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number'
  }
}
console.log(111 instanceof PrimitiveNumber) // true
```

如果你不知道 `Symbol`，可以看看[MDN上关于hasInstance的解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance)。（**Symbol.hasInstance** 用于判断某对象是否为某构造器的实例。因此你可以用它自定义 [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 操作符在某个类上的行为。）

其实就是自定义 `instanceof` 行为的一种方式，这里将原有的 `instanceof` 方法重定义，换成了 `typeof`，因此能够判断基本数据类型。

### 3. 手动实现 instanceof 的功能？

核心：原型链的查找

```js
function _instanceof(obj, fn){
    // 基本数据类型直接返回 false
    if(typeof obj !== 'object' || obj === null) return false;
    // getPrototypeOf 是 Object 对象自带的一个方法，能够获取参数的原型对象
    let proto = Object.getPrototypeOf(obj);
    while(true){
        // 表示查找到原型链的尽头，还没找到
        if(proto == null) return false;
        if(proto == fn.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

### Object.is 和 === 的区别？

`Object.is` 在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是 `+0` 和 `-0`，`NaN` 和 `NaN`。

源码如下：

```js
function is(x, y){
    if(x === y){
        // 运行到 1/x === 1/y 的时候 x 和 y 都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
        return x !== 0 || y !== 0 || 1/x === 1/y;
    }else{
        // NaN === NaN 是 false，这是不对的，在这里做一个拦截， x !== x，那么一定是 NaN，y 同理
        // 两个都是 NaN 的时候返回true
        return x !== x && y !== y;
    }
}
```



##  转换篇

### 1. [] == ![] 结果是什么？ 为什么？

解析： `==` 中，左右两边都需要转换为数字然后进行比较。

`[]` 转换为数字 0；

`![]` 首先是转换为布尔值，由于 `[]` 作为一个引用类型转换为布尔值为 `true`，

因此 `![]` 为 `false`，进而再转换为数字，变为 0。

0 == 0，结果为 `true`。



### 2. JS 中类型转换有哪几种？

JS 中，类型转换只有三种：

- 转换为数字
- 转换为布尔值
- 转换为字符串

转换规则如下：

> 注意 “ Boolean 转字符串 ” 这行结果指的是 true 转字符串的例子

![img](assets/16de9512eaf1158a)

**转Boolean**

在条件判断时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象。

### 3. == 和 === 有什么区别？

`===` 称为 严格等于，是指：左右两边不仅值要相等，类型也要相等（也就是不进行类型转换）。例如 '1' === 1 的结果是 `false` 

`==` 不像 `===` 那么严格，对于一般情况，只要值相等，就返回 `true`，但 `==` 还涉及一些类型转换，它的转换规则如下：

- 两边的类型是否相同，相同的话就比较值的大小，例如 `1 == 2`，返回 `false`。
- 判断的是否是 `null` 和 `undefined` ，是的话就返回 `true`。
- 判断的类型是否是`String`和`Number`，是的话，把`String`类型转换成`Number`，再进行比较。
- 判断其中一方是否是`Boolean`，是的话就把`Boolean`转换成`Number`，再进行比较。
- 如果其中一方为`Object`，且另一方为`String`、`Number`或者`Symbol`，会将`Object`转换成字符串，再进行比较

### 4. 对象转原始类型是根据什么流程进行的？

对象转原始类型，会调用内置的 `[ToPrimitive]` 函数，对于该函数而言，其逻辑如下：

1. 如果已经是原始类型了，那就不需要转换了
2. 调用 `valueOf()` ，如果转为原始类型，则返回
3. 调用 `toString()`，如果转为原始类型，则返回
4. 如果都没有返回原始类型，会报错

当然你也可以重写 `Symbol.toPrimitive` ，该方法在转原始类型时调用优先级最高。

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```



### 5. 如何让 if(a == 1 && a == 2) 条件成立？

其实就是上一个问题的应用。

```js
var a = {
    value:  0,
    valueOf: function(){
        this.value++;
        return this.value;
    }
};
console.log(a == 1 && a == 2)； // true
```

# 二、谈谈你对闭包的理解

### 什么是闭包？

> 红宝书(P178)上对于闭包的定义：闭包是指有权访问另一个函数作用域中的变量的函数。

> MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数 。（其中自由变量，是指在函数中使用，但既不是函数参数 arguments 也不是函数的局部变量的变量，其实就是另一个函数作用域中的变量。）

### 闭包产生的原因？

首先要明白作用域链的概念，其实很简单，在 ES5 中只存在两种作用域——全局作用域和函数作用域，**当访问一个变量时，解释器会首先在当前作用域查找提示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者在顶级作用域内页找不到，这就是作用域链**，值得注意的是，每个函数都会保留一个对父级作用域的引用，形成一个作用域的链条，比如：

```js
var a = 1;
function f1() {
  var a = 2
  function f2() {
    var a = 3;
    console.log(a);//3
  }
}
```

在这段代码中，`f1` 的作用域指向有全局作用域(`window`)和它本身，而`f2`的作用域指向全局作用域(`window`)、`f1`和它本身。而且作用域是从最底层向上找，直到找到全局作用域`window`为止，如果全局还没有的话就会报错。就这么简单一件事情！

**闭包产生的本质就是，当前环境中存在指向父级作用域的引用。**

```js
function f1() {
  var a = 2
  function f2() {
    console.log(a);//2
  }
  return f2;
}
var x = f1();
x();
```

这里 `x` 会拿到父级作用域中的变量，输出 `2`。因为在当前环境中，含有对 `f2` 的引用，`f2`恰恰引用了`window`、`f1`和`f2`的作用域。因此`f2`可以访问到`f1`的作用域的变量。

在 chrome 浏览器控制台可以看到，`Scope` 表示当前作用域，`Local` 表示当前活动对象，`Closure` 表示闭包（这里的闭包是 `f1` 函数）

![1591799977365](assets/1591799977365.png)

那是不是只有返回函数才算是产生了闭包呢？

回到闭包的本质，我们只需要让父级作用域的引用存在即可，因此我们还可以这么做：

```js
var f3;
function f1() {
  var a = 2
  f3 = function() {
    console.log(a);
  }
}
f1();
f3();
```

让 `f1` 执行，给 `f3` 赋值后，等于说现在 **f3 拥有了 window、f1 和 f3 本身这几个作用域的访问权限**，还是自底向上查找，最近的是在 `f1` 中找到了 `a`，因此输出 `2`。

在这里是外面的变量`f3存在着父级作用域的引用`，因此产生了闭包，形式变了，本质没有改变。

### 闭包有哪些表现形式？

明白了本质之后，我们就来看看，在真实的场景中，究竟在哪些地方能体现闭包的存在？

1. 返回一个函数。上面的例子

2. 作为函数参数传递：

   ```js
   var a = 1;
   function foo(){
     var a = 2;
     function baz(){
       console.log(a);
     }
     bar(baz);
   }
   function bar(fn){
     // 这就是闭包
     fn();
   }
   // 输出2，而不是1
   foo();
   ```

3. 在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。

   以下的闭包保存的仅仅是window和当前作用域：

   ```js
   // 定时器
   setTimeout(function timeHandler(){
     console.log('111');
   }，100)
   
   // 事件监听
   $('#app').click(function(){
     console.log('DOM Listener');
   })
   ```

4. IIFE(立即执行函数表达式) 创建闭包，保存了 **全局作用域 window** 和 **当前函数的作用域**，因此可以使用全局变量。

   ```js
   var a = 2;
   (function IIFE(){
     // 输出2
     console.log(a);
   })();
   ```

### 如何解决下面的循环输出问题？

```js
for(var i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}
```

为什么会全部输出6？如何改进，让它输出1，2，3，4，5？(方法越多越好)

**因为 setTimeout 为宏任务，由于 JS 单线程 eventLoop 机制，在主线程同步任务执行完后才去执行宏任务，因此循环结束后 setTimeout 中的回调才依次执行，但输出 i 的时候当前作用域不存在，往上级作用域寻找，发现了 i，但此时循环已经结束，i 变成了 6。因此会全部输出 6。**

解决方法：

1. 利用 `IIFE （立即执行函数表达式）`当每次 for 循环时，把此时的 i 变量传递到定时器中：

    ```js
    for(var i = 1;i <= 5;i++){
      (function(j){
        setTimeout(function timer(){
          console.log(j)
        }, 0)
      })(i)
    }
    ```

2. 给定时器传入第三个参数，作为 `timer` 函数的第一个函数参数：

   ```js
   for(var i=1;i<=5;i++){
     setTimeout(function timer(j){
       console.log(j)
     }, 0, i)
   }
   ```
   
3. 使用 ES6 中的 `let`（块级作用域）

    ```js
    for(let i = 1; i <= 5; i++){
      setTimeout(function timer(){
        console.log(i)
      },0)
    }
    ```

    `let` 使 JS 发生革命性的变化，让 JS 由函数作用域变为了块级作用域，用 let 后作用域链不复存在。代码的作用域以块级为单位，以上面代码为例:

    ```js
    // i = 1
    {
      setTimeout(function timer(){
        console.log(1)
      },0)
    }
    // i = 2
    {
      setTimeout(function timer(){
        console.log(2)
      },0)
    }
    // i = 3
    ```

    

    推一下 gitHub