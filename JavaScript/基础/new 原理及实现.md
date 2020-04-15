## 一、什么是 `new` ？

定义：`new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

看个例子：

```js
var Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};
const child = new Parent('gy', 21);
child.sayName(); // gy
```

可以看出 `new` 创建的实例有以下 2 个特性：

1. 能访问到 `Parent` 构造函数里的属性
2. 能访问到 `Parent.prototype ` 中的属性

在 `new` 操作中发生了什么呢？

- 创建一个新对象，以构造函数的 `prototype` 属性为原型，；
- 使 `this` 指向新建的对象（所以 `new` 操作会改变 `this` 指向）；
- 将 `this` 和调用参数传给构造函数，执行；
- 如果构造函数没有手动返回对象，则返回第一步创建的新对象。如果有，则返回手动 `return` 的对象；

## 二、模拟实现 new

```js
function _new() {
    // 1. 创建一个新对象
    var obj = new Object();
    // 2 .获得构造函数，取出 arguments 的第一个参数（会改变原数组）
    Constructor = [].shift.call(arguments);
    // 3. 将 obj 的原型指向构造函数的 prototype 
    obj.__proto__ = Constructor.prototype;
    // 4. 将构造函数的 this 指向新对象
    var ret = Constructor.apply(obj, arguments);
    // 5. 优先返回构造函数返回的对象 
    return typeof ret === 'object' ? ret : obj;
}
```

- 3 - 将 `obj` 的原型指向构造函数的 `prototype` ，这样 `obj` 就可以访问到构造函数原型（`prototype` 属性）中的属性。
- 4 - 使用 `apply` 将构造函数的 `this` 指向新对象，这样 `obj` 就可以访问到构造函数中的属性。 
- 5 - 判断构造函数返回的值是不是一个对象，如果是一个对象，优先返回这个对象，如果没有就返回新对象 `obj`

步骤 1 和步骤 3 的操作可以通过 `ES5` 提供的 `Object.create()` 来简化：

```js
function _new() {
    // 1. 创建一个新对象,并且将该的原型指向构造函数的 prototype 
    var obj = Object.create(Con.prototype);
    // 2 .获得构造函数，取出 arguments 的第一个参数（会改变原数组）
    Constructor = [].shift.call(arguments);
    // 3. 将构造函数的 this 指向新对象
    var ret = Constructor.apply(obj, arguments);
    // 4. 优先返回构造函数返回的对象 
    return typeof ret === 'object' ? ret : obj;
}
```

