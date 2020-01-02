class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
    addFront(element) {
        if(this.isEmpty()) {
            // 第一种情况:双端队列为空，直接添加到队列后端（也是队列前端）
            this.addBack(element);
        }else if(this.lowestCount > 0){
            // 第二种情况:lowestCount属性大于0时，只需把该属性-1并将新元素放入该位置即可
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        }else {
            // 第三种情况:lowestCount属性为0，将所有元素的索引都+1(即往后挪一位)，使第一位为空闲状态，并把新元素添加进去
            for(let i = this.count; i > 0; i--){
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;//
        }
    }
    // 在双端队列后端添加新元素
    addBack(element) {
        this.items[this.count] = element;
        this.count++;
    }
    // 移除队首
    removeFront() {
        // 检测队列是否为空
        if(this.isEmpty()){
            return undefined;
        }
        // 获得队列最前面的元素，注：索引不一定为0
        const  result = this.items[this.lowestCount];
        // 移除队首元素
        delete this.items[this.lowestCount];
        // 队首索引+1 及未移除前的第二位
        this.lowestCount++;
        return result;
    }
    // 移除队末
    removeBack() {
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
    // 返回队首
    peekFront() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    // 返回队末元素
    peekBack() {
		if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }

    // 清空队列中所有的元素
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }
    // 获取队列大小
    size() {
        return this.count - this.lowestCount;
    }
    // 检测队列是否为空
    isEmpty() {
        return this.size() === 0;
    }
    // 输出队列的内容
    toString() {
        if(this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for(let i = this.lowestCount + 1; i < this.count; i++){
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}

export default Deque;