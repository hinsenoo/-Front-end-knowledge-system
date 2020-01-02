function defaultEquals(a, b) {
    return a === b;
}
class Node {
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

export default class LinkedList {
    // 设置默认值为传入的比较函数
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }

    // 向尾部添加元素
    push(element) {
        // 创建要添加的元素
        const node = new Node(element);
        // 当前访问的元素
        let current;
        if(this.head == null) {
            // 当链表为空，直接添加到头部元素
            this.head = node;
        }else {
            // 从头部开始访问
            current = this.head;
            while (current.next != null) {
                // 循环访问每个元素，直到元素的next指向为null或undefined时跳出循环
                current = current.next;
            }
            // 将其next赋值为新元素，建立链接
            current.next = node;
        }
        // 长度+1
        this.count++;
    }

    // 返回链表特定位置的元素
    getElementAt(index) {
        // 合法性检验，不合法则返回undefined
        if(index >= 0 && index <= this.count) {
            // 初始化node变量
            let current = this.head;
            // 从head元素开始迭代整个链表,直到目标index。
            // 结束循环时，current元素将是index位置元素的引用。
            for(let i = 0; i < index && current != null; i++) {
                current = current.next;
            }
            return current;
        }
        return undefined;
    }

    // 添加元素
    insert(element,index) {
        if(index >= 0 && index <= this.count) {
            const node = new Node(element);
            if(index === 0) {
                // 在第一个位置添加元素
                const current = this.head;
                // 插入元素的next指向head元素
                node.next = current;
                // 将插入元素设为头部元素
                this.head = node;
            }else {
                // 获取目标位置的前一个元素
                const previous = this.getElementAt(index-1);
                // 获取目标位置的元素
                const current = previous.next;
                // 将插入元素的next指向目标位置元素
                node.next = current;
                // 将目标位置的前一个元素的next指向插入元素
                previous.next = node;
            }
            // 更新链表长度
            this.count++;
            return true;
        }
        return false;
    }

    // 寻找索引
    indexOf(element) {
        let current = this.head;
        // 从头部开始迭代元素
        for(let i = 0; i < this.count && current != null; i++){
            // 使用传入LinkedList类构造函数的判断函数
            if(this.equalsFn(element,current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }

    // 移除特定位置元素
    removeAt(index) {
        // 检查越界值 从0到链表的长度(索引是count-1，因为index是从0开始的)都是有效位置
        if(index >= 0 && index < this.count) {
            // 从第一个元素开始访问
            let current = this.head;
            // 移除第一项
            if(index === 0) {
                // 将head指向第二哥元素
                this.head = current.next;
            } else {
                // 存储对前一个元素的引用
                const previous = this.getElementAt(index-1);
                // 目标元素
                current = previous.next;
                // 将previous 与 current 的下一项链接起来；跳过current，从而移除它
                previous.next = current.next;
            }
            this.count--;
            // 返回被移除的元素
            return current.element;
        }
        // 越界
        return undefined;
    }

    // 移除元素
    remove(element) {
        // 使用indexOf找到其索引
        const index = this.indexOf(element);
        // 根据index使用removeAt删除该元素
        return this.removeAt(index);
    }

    size() {
        return this.count;
    }

    isEmpty() {
        return this.size() === 0;
    }

    getHead() {
        return this.head;
    }

    toString() {
        // 如果链表为空，返回一个空字符串
        if(this.isEmpty()) {
            return '';
        }
        // 使头部元素，初始化返回值
        let objString = `${this.head.element}`;
        // 当前访问元素为第二个元素
        let current = this.head.next;
        //  迭代链表元素，若链表只有一个元素，current != null 验证将失败
        for(let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;  
    }
}
