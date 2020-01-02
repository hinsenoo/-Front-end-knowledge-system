class Stack {
    constructor() {
        // 记录栈的大小
        this.count = 0;
           // 创建对象存储元素
        this.items = {};
    }
    // 方法如下
    push(element) {
        // 存储在栈顶
		this.items[this.count] = element;
        // 栈的大小+1
        this.count++;
    }
    isEmpty() {
        return this.count === 0;
    }
    size() {
    	return this.count;
    }
    pop() {
        // 验证栈是否为空
        if(this.isEmpty()) {
            return undefined;
        }
        // 栈的大小-1
        this.count--;
        // 获取要移除的元素;
        const result = this.items[this.count];
        // 从栈中移除该元素
        delete this.items[this.count];
        // 返回被移除的元素
        return result;
    }
    peek() {
		if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    clear() {
        this.items = {};
        this.count = 0;
        
        // 遵循栈的LIFO原则的做法
        /*
        while(!this.isEmpty()) {
            this.pop();
        }
        */
    }
    toString() {
        // 若栈为空，返回空字符串
		if(this.isEmpty()) {
            return '';
        }
        // 栈底元素为空
        let objString = `${this.items[0]}`;
        // 迭代整个栈
       	for (let i=1; i < this.count; i++){
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

export default Stack;