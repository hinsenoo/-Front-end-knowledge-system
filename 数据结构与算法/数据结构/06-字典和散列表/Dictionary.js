// 字典类
export default class Dictionary {
    constructor() {
        this.items = {};
    }

    // 检查某个键值是否存在于该字典中。
    hasKey(key) {
        return Object.prototype.hasOwnProperty.call(this.items,key);
    }

    // 向字典中添加新元素，若key已存在，那么存在的value会被新的值覆盖。
    set(key, value) {
        // 属性或者值不能为空
        if (key != null && value != null) {
            this.items[key] = value;
            return true;
        }
        return false;
    }

    // 通过使用键值来从字典中移除键值对应的数据值。
    remove(key) {
        if(this.hasKey(key)) {
            // 使用JS中的detele运算符移除属性
            delete this.items[key];
            return true;
        }
        return false;
    }

    // 通过键值查找特定的数组并返回。
    get(key) {
        return this.hasKey(key) ? this.items[key] : undefined;
    }

    // 将字典所包含的所有数值以数组形式返回。
    values() {
        // ES2017 Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组
        // return Object.values(this.items);
        
        // for-in 会循环枚举原型链中的属性
        let values = [];
        for(let key in this.items) {
            if(this.hasKey(key)) {
                values.push(this.items[key]);
            }
        }
        return values;
    }

    // 将字典所包含的所有键名以数组的形式返回。
    keys() {
        // ES2025 Object.keys()方法返回了一个包含给定对象所有属性的数组
        // return Object.keys(this.items);
    
        let values = [];
        for(let key in this.items) {
            if(this.hasKey(key)) {
                values.push(key);
            }
        }
        return values;
    }

    // 返回字典中的值的个数。
    size() {
        return Object.keys(this.items).length;
    }

    // 检测字典是否为空。
    isEmpty() {
        return this.size() === 0;
    }

    // 清空字典内容。
    clear() {
        this.items = {};
    }

    // 返回字典本身
    getItems = function(){
        return this.items;
    }
}