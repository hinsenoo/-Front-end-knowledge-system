import { defaultEquals } from './modules/defaultEquals.js';
import { Node } from './modules/Node.js';
import LinkedList from './LinkedList.js';

class DoublyNode extends Node {
    constructor(element, next , prev){
        super(element, next);
        // 指向上一个元素
        this.prev = prev;
    }
}

// 继承自普通链表
export default class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        // 调用父类(LinkedList类)的构造函数
        super(equalsFn);
        // 存储对尾部元素的引用
        this.tail = undefined;	
    }

    push(element) {
        const node = new DoublyNode(element);
        if (this.head == null) {
            this.head = node;
            this.tail = node; // NEW
        } else {
            // attach to the tail node // NEW
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.count++;
    }

    insert(element,index) {
        if(index >= 0 && index <=this.count ){
            const node = new DoublyNode(element);
            let current = this.head;
            // 1.插入位置为头部
            if(index === 0) {
                // 链表为空时
                if(this.head == null) { // {1}
                    // head 和 tail 都指向node
                    this.head = node;
                    this.tail = node;
                }else {
                    // 插入元素的next指向head元素
                    node.next = this.head; 	// {2}
                    // current(当前是head)的prev指向node元素
                    current.prev = node;	// {3}
                    this.head = node;		// {4}
                }
            }else if(index === this.count) { // 2.插入位置为最后一项
                // 访问尾部元素
                current = this.tail;		// {5}
                current.next = node;		// {6}
                node.prev = current;		// {7}
                // 尾部元素指向node
                this.tail = node;			// {8}
            }else { // 3. 插入中间任意位置
                const previous = this.getElementAt(index-1);	// {9}
                current = previous.next;	// {10}
                node.next = current;		// {11}
                previous.next = node;		// {12}
                current.prev = node;		// {13}
                node.prev = previous;		// {14}
            }
            this.count++;
            return true;
        }
        return false;
    }

    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next; // {1}
                // 如果只有一项，更新 tail // 新增的
                if (this.count === 1) { // {2}
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined; // {3}
                }
            } else if (index === this.count - 1) { // 最后一项 //新增的
                current = this.tail; // {4}
                this.tail = current.prev; // {5}
                this.tail.next = undefined; // {6}
            } else {
                current = this.getElementAt(index); // {7}
                const previous = current.prev; // {8}
                // 将 previous 与 current 的下一项链接起来——跳过 current
                previous.next = current.next; // {9}
                current.next.prev = previous; // {10} 新增的
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
    indexOf(element) {
        let current = this.head;
        let index = 0;
        while (current != null) {
            if (this.equalsFn(element, current.element)) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    }
    
    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }
    
    clear() {
        super.clear();
        this.tail = undefined;
    }
    
    toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        while (current != null) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}

