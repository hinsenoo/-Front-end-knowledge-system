class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        //....
    }
}

var p = new Point();

class Point {};
class ColorPoint extends Point{
    constructor(){
        super(); // 调用父类的 constructor
    }
};

class A {};
class B {};
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// B 的实例继承 A 的静态属性
Object.setPrototypeOf(B, A);

Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
}

class A extends Object {};
A.__proto__ === Object; // true
A.prototype.__proto__ === Object.prototype; // true

class A {};
A.__proto__ === Function.prototype; // true
A.prototype.__proto__ === Object.prototype; // true

class A extends null {};
A.__proto__ === Function.prototype; // true
A.prototype.__proto__ === undefined; // true

class C extends null {
    constructor() { return Object.create(null); }
}