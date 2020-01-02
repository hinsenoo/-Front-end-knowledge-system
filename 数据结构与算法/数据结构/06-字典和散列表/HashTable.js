export default class HashTable {
    constructor() {
        this.table = {};
    }

    // 散列函数
    loseloseHashCode(key) {
        // 数字之间返回
        if( typeof key === 'number') {
            return key;
        }
        // 其他类型转字符串
        const tableKey = String(key);
        let hash = 0;
        for(let i = 0; i < tableKey.length; i++ ){
            // 查询每个字符对应的ASCII值
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    
    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    // 向散列表增加一个新的项。（也能更新散列表）
    put(key,value) {
        // 检验合法性
        if(key != null && value !=undefined) {
            // 根据散列函数传入key参数返回对应的位置
            const position = this.hashCode(key);
            this.table[position] = value;
            return true;
        }
        return false;
    }

    // 返回根据键值检索到特定的值
    get(key) {
        const value = this.table[this.hashCode(key)];
        return value == null ? undefined : value; 
    }

    remove(key) {
        const hash = this.hashCode(key);
        const value = this.table[hash];
        if(value != null) {
            delete this.table[hash];
            return true;
        }
        return true;
    }

    getTable() {
        return this.table;
    }

    isEmpty() {
        return this.size() === 0;
    }
    
    size() {
        return Object.keys(this.table).length;
    }
    
    clear() {
        this.table = {};
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString},{${keys[i]} =>
            ${this.table[keys[i]].toString()}}`;
        }
        return objString;
    }
}