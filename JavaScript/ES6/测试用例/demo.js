// 正常版本的 readFile(多参数版本)
fs.readFile(fileName, callback);

// Thunk 版本的 readFile(单参数版本)
var Thunk = function (fileName) {
    return function (callback) {
        return fs.readFile(fileName, callback);
    }
}

var readFileThunk = Thunk(fileName);
readFileThunk(callback);

// ES5 版本
var Thunk = function(fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return function (callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    }
}

// ES6 版本
const Thunk = function(fn) {
    // rest 参数
    return function(...args) {
        return function(callback) {
            return fn.call(this, ...args, callback);
        }
    }
}
// 利用上面的转换器，生成 fs.readFile 的Thunk 函数。
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);

var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('paskage.json')(function(err, str) {
    //...
});

// Thunkify 源码

function thunkify(fn) {
    return function() {
        // 存储函数参数的数组
        var args = new Array(arguments.length);
        // 绑定执行上下文的this
        var ctx = this;

        for(var i = 0; i < args.length; ++i){
            // 将函数参数传入数组
            args[i] = arguments[i];
        }

        return function(done) {
            // 确保回调函数只运行一次
            var called;

            args.push(function() {
                if(called) return;
                called = true;
                // 执行回调函数
                done.apply(null, arguments);
            });

            try{
                fn.apply(ctx, args);
            }catch (err) {
                done(err);
            }
        }
    }
}

// 基于 Thunk 函数的 Generator 执行器
function run(fn) {
    var gen = fn();

    // Thunk 的回调函数
    function next(err, data) {
        var result = gen.next(data);
        if(result.done) return;
        result.value(next);
    }

    next();
}
// Generator 函数
function* g() {
    var f1 = yield readFile('fileA');
    var f2 = yield readFile('fileA');
    // ...
    var fn = yield readFile('fileN');
};
// 自动执行
run(g);

// 基于 Promise对象的自动执行
var fs = require('fs');

var readFile = function (fileName) {
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) return reject(error);
            resolve(data);
        });
    });
};

var gen = function* (){
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
}

var g = gen();

// 手动执行
g.next().value.then(function(data) {
    g.next().value.then(function(data) {
        g.next(data);
    })
})

function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);
        if(result.done) return result.value;
        // 只要Generator 没有执行到最后异步
        // next 函数就调用自身，以此实现自动执行
        result.value.then(function(data) {
            next(data);
        })
    }

    next();
}
run(gen);


function co(gen) {
    // 绑定当前函数的上下文的this
    var ctx = this;

    return new Promise(function (resolve, reject){
        // 判断是否为 Generator 函数
        if(typeof gen === 'function') gen = gen.call(ctx);
        // 若不是则将 Promise 对象的状态改为 resolved 且返回
        if(!gen || typeof gen.next !== 'function') return resolve(gen);

        onFulfilled();
        function onFulfilled(res) {
            var ret;
            try{
                ret = gen.next(res);
            }catch(e) {
                return reject(e);
            }
            next(ret);
        }

        function next(ret) {
            // 检查当前是否为 Generator 函数的最后一步，如果是就返回
            if(ret.done) return resolve(ret.value);
            //确保每一步的返回值都是Promise 对象
            var value = toPromise.call(ctx, ret.value);
            // 在参数不符和要求的情况下 将 Promise 对象的状态改为 rejected，从而终止操作
            if(value && isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(
                new TypeError(
                    'You may only yield a function, promise,generator,array or object,'
                    + 'but the following object was passed: "'
                    + String(ret.value) + '"'
                )
            )
        };
    });
}