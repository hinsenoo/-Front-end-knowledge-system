export default class Set {
    constructor() {
		this.items = {};
    }

    // 用来检查某个元素是否存在于集合中
    has(element) {
        //  in 运算符则返回表示对象在原型链上是否有特定属性的布尔值
        // return element in items;
        
        // 更好的实现方式 
        //Object 原型的 hasOwnProperty 方法返回一个表明对象是否具有特定属性的布尔值。
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }

    // 向集合添加一个新元素
    add(element) {
        // 检查要添加的元素是否已存在
        if(!this.has(element)){
            this.items[element] = element;
            return true;
        }
        return false;
    }

    // 移除元素
    delete(element) {
        if(this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }

    // 清空集合
    clear() {
        // 重置items对象
        this.items = {};
    }

    // 返回集合中元素的数量
    size() {
        // ES2015
        // 返回一个包含给定对象所有属性的数组（自身属性）
        // return Object.keys(this.items).length;
        
        let count = 0;
        for (let key in this.items) {
            if(this.has(key)){
                count++;
            }
        }
        return count;
    };

    // 返回一个包含集合中所有值（元素）的数组。
    values() {
        // ES2017 Object.values()方法返回了一个包含给定对象所有属性的数组
        // return Object.values(this.items);
        
        let values = [];
        for(let key in this.items) {
            if(this.has(key)) {
                values.push(key);
            }
        }
        return values;
    }

    // 并集
    // ES2015版
    union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;

        // 通用版
        // const unionSet = new Set(); // {1}

        // let values = this.values(); // {2}
        // for (let i = 0; i < values.length; i++){
        //     unionSet.add(values[i]);
        // }
        // values = otherSet.values(); // {3}
        // for (let i = 0; i < values.length; i++){
        //     unionSet.add(values[i]);
        // }
        // return unionSet;
    }

    // 交集
    intersection(otherSet) {
        const intersectionSet = new Set();
        
        const values = this.values();
        // 迭代当前Set实例，使用has方法验证属性是否也存在于otherSet实例中
        for(let i = 0; i < values.length; i++) {
            if(otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }

    // 差集
    difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(value => {
            if(!otherSet.has(value)){
                differenceSet.add(value);
            }
        });
        return differenceSet;
    }

    // 子集
    isSubsetOf(otherSet) {
        // 子集的元素个数需要小于或等于要比较的集合
        if(this.size() > otherSet.size()) {
            return false;
        }
        let isSubset = true;
        // 迭代每一个元素，当前实例拥有的元素，otherSet都有
        // 当前实例才为otherSet的子集
        this.values().every(value => {
            if(!otherSet.has(value)) {
                isSubset = false;
                return false;
            }
            return true;
        });
        return isSubset;
    }
}