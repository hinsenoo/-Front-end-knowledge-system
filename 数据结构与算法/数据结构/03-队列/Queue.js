class Queue {
    constructor() {
        // 队列序号（包含已经离队的）
        this.count = 0;
        // 队列最前端的元素索引
   		this.lowestCount = 0;
        // 存储队列元素的对象
        this.items = {};
    }
    // 添加新元素
    enqueue(element) {
        // 新的项只能添加到队列末尾
        this.items[this.count] = element;
        this.count++;
    }
    // 获取队列大小
    size() {
        return this.count - this.lowestCount;
    }
    // 检测队列是否为空
    isEmpty() {
        return this.size() === 0;
    }
    // 移除队首
    dequeue() {
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
    // 返回队首
    peek() {
        if(this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    // 清空队列中所有的元素
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
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

export default Queue;