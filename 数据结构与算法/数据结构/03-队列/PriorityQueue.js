class PriorityQueue{
    constructor() {
        // 队列序号（包含已经离队的）
        this.count = 0;
        // 队列最前端的元素索引
        this.lowestCount = 0;
        // 存储队列元素的对象
        this.items = {};
        // 初始化元素对象
        this.queueElement = {
            element: '',
            priority: 0,
        }
    }

    // 添加元素根据优先级选择位置进行添加
    enqueue(element,priority) {
        // 对对象进行解构赋值
        this.queueElement = {element,priority};
        // 若队列为空，则直接添加
        if(this.isEmpty()) {
            this.items[this.count] = this.queueElement;
            this.count++;
        }else {
            // 是否被添加标识
            let added = false;
            for(let i = 0; i < this.count; i++){
                // 比较优先级
                if(this.queueElement.priority < this.items[i]['priority']) {
                    // 若优先级小于某个元素，则插入某个元素的位置，其他元素向后挪
                    for(let j = this.count; j > i; j--) {
                    this.items[j] = this.items[j-1];
                    }
                    // 插入元素
                    this.items[i] = this.queueElement;
                    this.count++;
                    added = true;
                    break;
                }
            }
            if(!added) {
                this.items[this.count] = this.queueElement;
                this.count++;
            }
        }
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
        let objString = `${this.items[this.lowestCount]['element']}`;
        for(let i = this.lowestCount + 1; i < this.count; i++){
            objString = `${objString},${this.items[i]['element']}`;
        }
        return objString;
    }
}

export default PriorityQueue;