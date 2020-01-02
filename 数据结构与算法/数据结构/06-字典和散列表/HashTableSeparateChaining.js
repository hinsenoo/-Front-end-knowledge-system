import { ValuePair } from './modules/ValuePair.js';
import LinkedList from './modules/LinkedList.js';

export default class HashTableSeparateChaining {
    constructor() {
        this.table = {};
    }
    

    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = String(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }

    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    // ============================改动
    put(key, value) {
        if(key != null && value != null) {
            const position = this.hashCode(key);
            if(this.table[position] == null ) {
                // 若该位置为空，则初始化一个LinkedList类的实例
                this.table[position] = new LinkedList();
            }
            // 使用LinkedList实例的push方法添加ValuePair实例（键和值）
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }

    // ============================改动
    get(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        // 验证该位置上是否存在元素
        if(linkedList != null && !linkedList.isEmpty()) {
            // 迭代整个链表，直到找到key对应的值
            let current = linkedList.getHead();
            while(current != null) {
                if(current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }

    // ============================改动
    remove(key) {
        const position = this.hashCode(key);
        const linkedList = this.table[position];
        if(linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while(current != null) {
                if(current.element.key === key) {
                    // 移除该元素
                    linkedList.remove(current.element);
                    if(linkedList.isEmpty()) {
                        // 若链表为空,则将散列表的该位置删除
                        delete this.table[position];
                    }
                    // 移除成功
                    return true;
                }
                current = current.next;
            }
        }
        // 移除失败
        return false;
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        let count = 0;
        Object.values(this.table).forEach(linkedList => {
            count += linkedList.size();
        });
        return count;
    }

    clear() {
        this.table = {};
    }

    getTable() {
        return this.table;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let obj = {};
        for (let i = 0; i < keys.length; i++) {
            let objString = `{${keys[i]} => ${this.table[keys[i]].toString()}}`;
            obj[i] = objString; 
            // objString = `${objString},/n,{${keys[i]} => ${this.table[
            //     keys[i]
            // ].toString()}}`;
        }
        return obj;
    }
}