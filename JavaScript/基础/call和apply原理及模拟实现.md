​		在 [this 的显式绑定规则](https://juejin.im/post/5e80f60ef265da47c43204da#heading-4)中，通过使用函数的 (ES3) **call(...)、apply(...)** 方法在调用时将指定对象绑定到 `this` 

。而为了解决绑定丢失的问题，使用硬绑定模式引出了 **bind(...)** 方法（ES5 提供）。

​		下面来分别探讨这三个方法的原理以及实现 👇：

## 一、什么是 `call` 和 `apply` ？

先来简单介绍一下 `call` 和 `apply`

### call 介绍

- `call` 是属于 `Function` 的方法，也就是 `Function.prototype.call`。

- `call()` 方法调用一个函数，并且指定一个 `this` 值和指定的提供给函数的若干个参数值。

- 语法：`func.call(thisArg, arg1, arg2, ...)`

- 参数：
  - `thisArg` ：传递一个对象，函数中的 `this` 指向这个对象。
    - 若函数体处于非严格模式下，则指定 `null` 和`undefined` 的 `this` 值会自动指向全局对象。 
    - 若值为原始值（数字，字符串，布尔值）的 `this` 会指向该原始值的自动包装对象。
  - `arg1, arg2, ...`：可选，指定的参数列表（需一一列举出来）。
  
- 简单使用：

  ```js
  var obj = { a:1 };
  function foo(a,b) {
      this.a = a;
      this.b = b;
  }
  foo.call(obj,2,3);
  console.log(obj); // {a: 2, b: 3}
  ```



### apply 介绍

- `apply` 也是属于 `Function` 的方法，也就是 `Function.prototype.apply`。

- `apply()` 方法调用一个函数，并且指定一个 `this` 值和指定提供给函数的参数值数组。

- 语法：`func.apply(thisArg, [argsArray])`

- 参数：

  - `thisArg` ：规则与 `call` 一致。
  - `argsArray`：可选，一个数组或者类数组对象，其中的数组元素将作为单独的参数传递给 `func` 函数。

- 简单使用：

  ```js
  var obj = { a:1 };
  function foo(a,b) {
      this.a = a;
      this.b = b;
  }
  foo.apply(obj,[2,3]);
  console.log(obj); // {a: 2, b: 3}
  ```


### 两者的异同

​		`call` 与 `apply` 的功能完全相同，唯一不同的是 `call` 方法传递给函数调用的形参必须**一一列举出来**，而 `apply` 方法的形参是一个**数组**。在传惨的情况下，`call` 性能要高于 `apply`，因为 `apply` 在执行时还要多一步解析数组。

### 使用场景



## 二、call 的模拟实现

```
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```

分析一下 `call()` 在上面的代码中的作用：

1. `call` 改变了 `this` 的指向，指向到 `foo`。
2. `bar` 函数在改变指向后执行了。 

从上面的分析可以得出，要实现这两个效果，可以在调用 `call()` 把 `foo` 对象改造成如下：
```js
var foo = {
    value: 1,
    bar: function(){
        console.log(this.value);
    }
};
foo.bar(); // 1
```

这时候的 `this` 就指向了 `foo` （隐式绑定），但是这样却给 `foo` 添加一个属性，需要用 delete 把它删除。

所以可以把模拟的步骤分为：

1. 将函数设置为对象的属性：`foo.fn = bar;`
2. 执行该函数：`foo.fn();`
3. 从对象中把该属性删除：`delete foo.fn;`

代码实现如下：

```js
// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用 call 的函数，用 this 可以来获取。
    context.fn = this;
    context.fn();
    delete context.fn;
}
```

1. 可能会出现 `fn` 同名覆盖问题，会覆盖传入对象上的属性，然后删除。可以使用生成时间戳来作为属性名：

   `'_' + new Date().getTime()`

2. 但是，call 函数还能给定参数执行函数：通过从 Arguments 对象中取值，取出第二个到最后一个参数，然后存储到一个数组中。

2. 然后还需要把这个参数数组中放到要执行的函数的参数里面去。
   - 若用 `args.join(',')` 会返回一个字符串，并不会执行。
   - 由于 call 是 ES3 的方法，使用 ES6 的 `...` 并不是很好，所以可以使用 `eval` 方法拼成一个函数：

```js
// 第二版
Function.prototype.call2 = function(context) {
    // 获取当前时间戳作为属性名,避免属性覆盖
    var fn = '_' + new Date().getTime();
    context[fn] = this;
    
    // 获取函数执行参数 args =>  ["arguments[1]", "arguments[2]",...]
   	var args = [];
    // 由于 argumentss 是类数组对象，所以可以使用 for 循环
    for(var i = 1, len = arguments.length; i < len; i++){
        args.push('arguments['+ i +']');
    }
    
    // 执行函数,传递参数 
    eval('context[fn]('+ args +')');
    delete context[fn];     
    
}
```

3. `this` 参数可以传 `null`，当为 `null`，视为指向 `window`
4. 函数是可以有返回值的！
5. `this` 参数可以传基本类型数据，原生的 `call` 会自动用 `Objcet()` 转换 

```js
Function.prototype.call2 = function(context) {
    // 获取当前时间戳作为属性名,避免属性覆盖
    var fn = '_' + new Date().getTime();
    // 当指定 this 为 null，视为指向 window
    var context = context ? Object(context) : window;
    context[fn] = this;
    
    // 获取函数执行参数 args =>  ["arguments[1]", "arguments[2]",...]
   	var args = [];
    // 由于 argumentss 是类数组对象，所以可以使用 for 循环
    for(var i = 1, len = arguments.length; i < len; i++){
        args.push('arguments['+ i +']');
    }
    
    // 执行函数,传递参数 并获取函数的返回值
    var result = eval('context[fn]('+ args +')');
    
    delete context[fn];     
    // 返回函数的返回值
    return result
}
```

- 测试一下：

  ```js
  var obj = { a:1 };
  function foo(a,b) {
      this.a = a;
      this.b = b;
  }
  foo.call2(obj,2,3);
  console.log(obj);// {a: 2, b: 3}
  ```

### ES6 版本的 call 简单模拟实现

- 用 Symbol 来标识属性名，可避免属性重复。
- 使用扩展运算符 `...` 来展开数组，与 `[]` 配合使用可以把类数组转为数组。

```js
Function.prototype.myCall = function(context){
    // ES6 新增的基本数据类型 Symbol——符号
    var fn = Symbol();
    var context = context || window;
  	context[fn] = this;
    // 使用扩展运算符... 通过 [..arrayLike] 将类数组转换为数组
    // 使用数组方法 slice 获取从第二个开始的参数并返回一个新的数组
    var args = [...arguments].slice(1);
	// 使用扩展运算符展开数组来传递参数
    var result = context[fn](...args);
    // 删除 fn
    delete context[fn];
    return result;
}
```

## 三、apply 的模拟实现

apply 的实现跟 call 很类似，区别就是 apply 是获取一个参数值数组解析成参数传递给函数：

```js
Function.prototype.apply2 = function(context,arr) {
    var fn = '_' + new Date().getTime();
    var context = context ? Object(context) : window;
    context[fn] = this;
    
   	var result;
    // 判断是否有第二个参数
    if(!arr){
        // 若无需传递参数，则直接执行
        result = context[fn]();
    }else{
        var args = [];
        // 直接使用
        for(var i = 0, len = arr.length; i < len; i++){
            args.push('arr['+ i +']');
        }
        result = eval('context[fn]('+ args +')');
    }
    
    delete context[fn];     
    return result;
}
```

### ES6 版本的 apply 简单模拟实现

与 **call** 的 ES6 版本同理：

```js
Function.prototype.myApply = function (context,arr) {
    var fn = Symbol();
    var context = context || window;
    context[fn] = this;

    var result;
    // 需要判断是否存在第二个参数
    if (!arr) {
    	result = context[fn]();
    } else {
        // 如果存在，则展开第二个参数传递给数组
    	result = context[fn](...arr);
    }
    
    delete context[fn];
    return result;
}
```

### 

## 四、什么是 bind ?

### bind 介绍

- `bind` 是 ES5 新增的一个方法，也是属于 `Function` 的方法（ `Function.prototype.call`）。
- `bind()` 方法创建一个新的函数（称为绑定函数），当绑定函数被调用时， `bind()` 的第一个参数作为 `this`，而其余参数将会在传递的实参钱传入作为它的参数，供调用时使用。
- 语法：`func.call(thisArg, arg1, arg2, ...)`
- 参数：与  `call` 一致

- 简单使用：

  ```js
  var foo = {
      value: 1
  };
  
  function bar() {
      console.log(this.value);
  }
  
  // 返回了一个函数
  var bindFoo = bar.bind(foo); 
  
  bindFoo(); // 1
  ```

注：**ECMAScript 规范提到：Funcition.prototype.bind 创建的函数对象不包括 prototype 属性，[[Code]], [[FormalParameters]],[[Scope]] 内部属性。**

### 使用场景

```js
function Person(name){
     this.nickName = name;
     this.fn = function() {
       setTimeout(function(){
         console.log(this.nickName);
       }, 500);
     }
}
 
var person = new Person('gy');
person.fn();// undefined
```

- 这个时候输出的 `this.name`  是 `undefined` ，原因是 `this` 指向在函数调用时确定的，因为 `setTimeout` 的代码都是在全局环境下执行，所以 `this` 指向 window 对象（非严格模式下）。
- 以前解决这个问题的办法通常是缓存 `this` ，例如：

```js
function Person(name){
     this.nickName = name;
     this.fn = function() {
       var _this = this
       setTimeout(function(){
         console.log(_this.nickName);
       }, 500);
     }
}
 
var person = new Person('gy');
person.fn();// gy
```

- 现在可以有个更好的办法，就是使用 `bind`：

```js
function Person(name){
     this.nickName = name;
     this.fn = function() {
       setTimeout(function(){
         console.log(this.nickName);
       }.bind(this), 500); // --------
     }
}
 
var person = new Person('gy');
person.fn();// gy
```

### 与 call、apply 的异同

1. `call、apply、bind` 都用于改变 `this` 绑定，但 `call、apply` 在改变 `this` 指向的同时还会执行函数，而 `bind`  在改变 `this` 后是一个全新的函数。
2. `bind` 属于硬绑定，返回的新函数的 `this` 指向无法再次通过显式绑定来修改，`call` 与 `apply` 的绑定只适合当前调用，调用完就结束了，再次调用需要重新绑定。



## 五、bind 的模拟实现

