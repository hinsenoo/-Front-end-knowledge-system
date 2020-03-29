# 一、this是什么？

​		当一个函数被调用时，会创建一个活动记录（有时候也称为[执行上下文](https://juejin.im/post/5e7f894651882573c2190801)）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。`this` 就是这个记录的一个属性，会在函数执行的过程中用到。

​		所以说 `this` 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。`this` 的绑定和函数声明的位置没有任何关系，**只取决于函数的调用方式（调用位置）**。

注：调用位置就是函数**在代码中被调用的位置**（而不是声明的位置）

​		接下来就让我们来捋一捋关于 `this` 的绑定👇

# 二、绑定规则

​		从`this` 绑定的五种场景（**默认绑定、隐式绑定、显式绑定、new 绑定、箭头函数绑定**）来分析 `this`，以及它们的优先级如何排列。

## 1. 默认绑定

​		最常用的函数调用类型：**独立函数调用**。可以把这条规则看作是无法应用其他规则时的默认规则。默认规则，`this` 指向**全局对象**。

举个例子：

```js
function foo(){
    console.log(this.a);
}
var a = 2;

foo(); // 2
```

本例中，函数调用时应用了 `this` 的默认绑定，因此 `this`  指向全局对象 `window`，`foo` 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定。

注：**对于默认绑定来说，如果函数体处于严格模式，`this` 会被绑定到 `undefined`，否则 `this` 会被绑定到全局对象；并不是调用位置是否处于严格模式。**



## 2. 隐式绑定

​		当函数引用有**上下文对象**，或者说被某个对象拥有作为对象的属性，隐式绑定规则会把函数中的 `this` 绑定到这个上下文对象。

举个例子：

```js
function foo(){
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
// 隐式绑定规则 this.a ==> obj.a
obj.foo(); // 2
```

要注意对象属性引用链中只有上一层或者说最后一层在调用中隐式绑定规则才会起作用，例如：

```js
function foo(){
    console.log(this.a);
}
var obj1 = {
    a: 22,
    foo: foo
};
var obj2 = {
    a: 33,
    obj1: obj1
};
obj2.obj1.foo(); //22
```

即如果函数调用前存在多个对象，`this` 指向距离调用自己最近的对象。

**隐式丢失**

一个最常见的 `this` 绑定问题就是被**隐式绑定**的函数会丢失绑定对象，也就是说它会应用**默认绑定**，从而把 `this`  绑定到全局对象或者 `undefined` 上，取决于函数体是否是严格模式。

举个例子：

```js
function foo(){
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // 函数别名！！！
var a = "global"; // a 是全局对象的属性
// 绑定丢失
bar(); // "global" 
```

虽然 `bar` 是 `obj.foo` 的一个引用，但是实际上，它引用的是 `foo` 函数本身，因此此时的 `bar()` 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

参数传递是一种隐式赋值，传入函数时也会被隐式赋值。回调函数丢失 `this` 绑定也是非常常见的。

```js
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // fn其实引用的是foo
    
    fn(); // <-- 调用位置！
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a是全局对象的属性

doFoo( obj.foo ); // "oops, global"

//---------------------------------
// JS环境中内置的setTimeout()函数实现和下面的伪代码类似：
function setTimeout(fn, delay) {
    // 等待delay毫秒
    fn(); // <-- 调用位置！
}
```



## 3. 显式绑定

​		通过使用函数的 `call(...)` 或者 `apply(...)` 方法。第一个参数是一个对象，在调用时将这个对象绑定到 `this`。因为直接指定 `this` 的绑定对象，所以称之为**显式绑定**。

举个例子：

```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};
// 通过 foo.call(...)，可以在调用 foo 时强制把它的 this 绑定到 obj 上。
foo.call( obj ); // 2
```

但是显示绑定也无法解决上面的丢失绑定的问题。

解决方案：

### 3.1 硬绑定

创建函数 `bar`，并在它的函数内部手动调用 **foo.call(obj)**，强制把 `foo` 的 `this` 绑定到了 `obj`。

```js
function foo(){
    console.log(this.a);
}
var obj = {
    a: 2
};
var bar = function(){
    foo.call(obj);
};
bar(); //2
setTimeout(bar, 100); //2

// 而且硬绑定的 bar 无法再修改它的 this
bar.call(window); // 2
```

硬绑定的典型应用场景就是创建一个包裹函数，负责接收参数并返回值：

```js
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function() {
    // 绑定包裹函数，并且传递参数
    return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

另一种使用方法是创建一个可以重复使用的辅助函数：

```js
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
    return function() {
        return fn.apply( obj, arguments );
    }
}

var obj = {
    a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

由于硬绑定是一种非常常用的模式，所以 **ES5** 提供了内置的方法 `Function.prototype.bind`，用法如下：

```js
function foo(somethins) {
    console(this.a, something);
    return this.a + something; 
}

var obj = {
    a: 2
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5
```

### 3.2 API 调用的 ”上下文“

JS 许多内置函数提供了一个可选参数，被称之为 **”上下文（context）“**，其作用和 `bind(...)` 一样，确保回调函数使用指定的 `this`，这些函数实际上就是通过 `call(..)` 和 `apply(..)` 实现了显式绑定。

```js
function foo(el) {
	console.log( el, this.id );
}

var obj = {
    id: "awesome"
}

// 调用foo(..)时把this绑定到obj
[1, 2, 3].forEach( foo, obj );
// 1 awesome 2 awesome 3 awesome
```

### 补充：call、apply、bind 有什么区别？

1. `call、apply、bind` 都用与改变 `this` 绑定，但 `call、apply` 在改变 `this` 指向的同时还会执行函数，而 `bind` 在改变 `this` 后是返回一个全新的 `boundFunction` 绑定函数  ，这也是为什么上方例子中 `bind` 后还加了一对括号的原因。
2. `bind` 属于硬绑定，返回的 `boundFunction` 的 `this` 指向无法再次通过 `call、apply、bind` 修改；`call` 与 `apply` 的绑定只适合当前调用，调用完就结束了，再次调用需要重新绑定。
3. `call` 与 `apply` 的功能完全相同，唯一不同的是 `call` 方法调传递函数调用的形参必须**一一列举出来**，而 `apply` 方法的形参是一个**数组**。在传参的情况下，`call` 的性能要高于 `apply`，因为 `apply` 在执行时还要多一步解析数组。

详情请至👉 （emmm....  还没写 TODO: call、apply、bind 的原理以及实现---------------------）

## 4. new 绑定

​		在 JS 中，构造函数只是一些使用 `new` 操作符被调用的**普通函数**，他们不属于某个类，也不会实例化一个类。

​		包括内置对象函数在内的所有函数都可以用 `new` 来调用，这种函数调用被称为**构造函数调用**。 （实际上不存在所谓的“构造函数”，只有对于函数的 “构造调用”）。

​		使用 `new` 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

1. 创建（或者说构造）一个新对象。
2. 这个新对象会被执行 `原型[[Prototype]]` 连接。
3. 这个新对象会绑定到函数调用的 `this`。
4. 如何函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。

使用 `new` 来调用 `foo(..)` 时，会构造一个新对象并把它绑定到 `foo(...)` 调用中的 `this` 上：

```js
function foo(a) {
    this.a = a;
}
// 把新对象赋值给 bar
var bar = new foo(2);
console.log(bar.a); // 2
```

在 `new` 中使用硬绑定函数的目的是预先设置函数的一些参数，这样在使用 `new` 进行初始化时就可以传入其余的参数。`bind(..)` 的功能之一就是可以把除了第一个参数（第一个参数用与绑定 `this`）之外的其他参数都传给下层的函数（这种技术称为 "部分应用"，是 ”柯里化“ 的一种）。

举例：

```js
function foo(p1, p2) {
    this.val = p1 + p2;
}

// 之所以使用 null 是因为在本例中我们并不关心硬绑定的this是什么
// 反正使用 new 时 this 会被修改
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val;
```



### 补充：new 实现

```js
function _new(){
    // 创建一个新的对象
    var obj = new Object();
    // 获得函数，然后进行构造调用
    // 使用 shift 获取并除去 arguments 的第一个参数
    fn = Array.prototype.shift.call(arguments);
    // 将新对象的原型指向构造函数的原型
    obj.__proto__ = fn.prototype;
    // 显式绑定 this，改变构造函数 this 的指向到新对象上，这样新对象就可以访问构造函数中的属性
    var ret = fn.apply(obj, arguments);
    // 优先返回构造函数返回的对象
    return ret instanceof Object ? ret : obj;
}
```



## 5. 绑定优先级

根据优先级来判断函数在某个调用位置应用的是哪条规则，可以按照下面的顺序来进行判断：

1. 由 `new` 调用？ 绑定到新创建的对象。
2. 由 `call` 或 `apply`（或者 `bind`）调用？ 绑定到指定的对象。
3. 由上下文对象调用？ 绑定到那个上下文对象。
4. 默认：函数体在严格模式下绑定到 undefined，否则绑定到全局对象。

## 6. 绑定例外

### 6.1 被忽略的 this 

如果把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者`bind` ，这些值在调用时会被忽略，实际应用的是默认规则。

以下两种情况会传入 `null`：

- 使用 `apply(...)` 来 ”展开“ 一个数组，并当作参数传入一个函数。

- 使用 `bind(...)` 可以对参数进行柯里化（预先设置一些参数）。

  ```js
  function foo(a,b){
      console.log(a,b);
  }
  
  // 把数组 "展开" 成参数
  foo.apply(null, [2,3]); // 2 3
  
  // 使用 bind(...) 进行柯里化
  var bar = foo.bind(null, 2);
  bar(3); // 2 3
  ```

  补充： 在 ES6 中使用 ...操作符可以代替 apply(..) 来展开数组，可以避免不必要的 this 绑定。

总是传入 `null` 来忽略 `this` 绑定可能会产生一些副作用。如果某个函数确实使用了 `this`，那默认绑定规则会把 `this` 绑定到全局对象。

**更安全的this**

安全的做法是传入一个特殊的对象（空对象），把 `this` 绑定到这个对象不会对程序产生任何副作用。

在 JavaScript 创建一个空对象最简单的方法都是 `Object.creat(null)`。该方法和 `{}` 很像，但是并不会创建 `Object.prototype` 这个委托，所以它比 `{}` "更空"。

```js
function foo(a,b){
    console.log(a,b);
}
// 空对象
var emptyObject = Object.create(null);

// 把数组 "展开" 成参数
foo.apply(emptyObject, [2,3]); // 2 3

// 使用 bind(...) 进行柯里化
var bar = foo.bind(emptyObject, 2);
bar(3); // 2 3
```

### 6.2 间接引用

在”间接引用”下，调用这个函数会应用默认绑定规则。间接引用最容易在**赋值**时发生。

```js
function foo() {
    console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4};

o.foo(); // 3
(p.foo = o.foo)(); // 2
```

赋值表达式 `p.foo = o.foo` 的返回值是目标函数的引用，因此调用位置是 `foo()` 而不是 `p.foo()` 或者 `o.foo()`

### 6.3 软绑定

由于硬绑定可以把 `this` 强制绑定到指定的对象（除了使用 `new` 时），来防止函数调用应用默认绑定规则。但是硬绑定会降低函数的灵活性，**使用硬绑定之后就无法使用隐式绑定或显式绑定来修改 `this`**

如果可以**给默认绑定指定一个全局对象和 `undefined` 以外的值**，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改 `this` 的能力。

通过实现一种称为软绑定的方法：

```js
if(!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        // 获取调用时的 this 
        var fn = this;
        // 捕获所有 curried 参数
        var curried = [].slice.call( arguments, 1 );
        var bound = function(){
            return fn.apply(
                // 首先检查调用时的 this
                // 如果 this 绑定到全局对象或者 undefined，
                // 就把指定的默认对象 obj 绑定到 this，否则不会修改 this
            	(!this || this == (window || global)) ?
                obj : this,
                // 支持可选的柯里化
                curried.concat.apply(curried,arguments);
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}
```

使用例子：

```js
function foo() {
    console.log("name:" + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

// 软绑定把this绑定到默认对象obj
var fooOBJ = foo.softBind( obj );
fooOBJ(); // name: obj 

// 隐式绑定规则
obj2.foo = foo.softBind( obj );
obj2.foo(); // name: obj2 <---- 看！！！

// 显式绑定规则
fooOBJ.call( obj3 ); // name: obj3 <---- 看！！！

// 绑定丢失，应用软绑定，将其绑定到 obj
setTimeout( obj2.foo, 10 ); // name: obj
```

软绑定版本的 `foo()` 可以手动将 `this` 绑定到 `obj2` 或者 `obj3` 上，但如果应用默认绑定，则会将 `this` 绑定到 `obj`。

## 7. this 词法（箭头函数）

ES6 新增的一种特殊函数类型：**箭头函数**，箭头函数不使用 `this`  的四种标准规则，而是根据外层（函数或全局）作用域（**词法作用域**）来决定 `this` 。

举个例子：

```js
function foo() {
    // 返回一个箭头函数
    return (a) => {
        // this继承自foo()
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
}

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2，不是3
```

`foo()` 内部创建的箭头函数会捕获调用时 `foo()` 的 `this` 。由于 `foo()` 的 `this` 绑定到 `obj1`，`bar` （引用箭头函数）的 `this` 也会绑定到 `obj1`，**箭头函数的绑定无法被修改（`new` 也不行）**。

箭头函数最常用于回调函数中，如事件处理器或者定时器：

```js
function foo(){
    setTimeOut(()=>{
        // 这里的 this 在词法上继承自 foo()
        console.log(this.a);
    },100);
}

var obj = {
    a: 2
};
foo.call(obj); // 2
```

箭头函数可以像 `bind()` 一样确保函数的 `this` 被绑定到指定对象，此外**其重要性还体现在它用更常见的词法作用域取代了传统的 `this` 机制。**

```js
// 传统 this 机制
function foo() {
    var self = this; // lexical capture of this
    setTimeout( function() {
        // self 引用了foo()函数的this绑定
        console.log( self.a ); 
    }, 100 );
}

var obj = {
    a: 2
};

foo.call(obj); // 2
```

建议：只使用词法作用域并完全抛弃错误 `this` 风格的代码；或者完全采用 `this` 风格，在必要时使用 `bind(...)`，尽量避免使用 `self = this` 和箭头函数。



> ### 参考
>
> 《你不知道的 JavaScript》上卷
>
> [JavaScript深入之史上最全--5种this绑定全面解析](https://www.muyiy.cn/blog/3/3.1.html#_1-%E8%B0%83%E7%94%A8%E4%BD%8D%E7%BD%AE)
>
> [[js 五种绑定彻底弄懂this，默认绑定、隐式绑定、显式绑定、new绑定、箭头函数绑定详解](https://www.cnblogs.com/echolun/p/11962610.html)

