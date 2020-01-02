import { defaultCompare } from './modules/until.js';

// 交换函数
// ES6——解构赋值
// const swap = (array,a,b) => [array[a],array[b]] = [array[b], array[a]];
function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

export default class MinHeap {
    constructor(compareFn = defaultCompare) {
        // 比较储存在数据结构中的值，没有传入则使用默认比较函数
        this.compareFn = compareFn;
        // 使用数组存储数据
        this.heap = [];
    }
    // 获取当前节点的左子节点索引
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    // 获取当前节点的右子节点索引
    getRightIndex(index) {
        return 2 * index + 2;
    }
    // 获取当前节点的父节点索引
    getParentIndex(index) {
        if(index === 0) {
            return undefined;
        }
        return Math.floor(index / 2);
    }

    // 插入值
    insert(value) {
        // 检验值的合法性
        if(value != null) {
            this.heap.push(value);
            // 上移函数，传入数组最后一个元素（即插入的值）的索引
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return true;
    }

    // 上移方法
    siftUp(index) {
        // 获取父节点的位置
        let parent = this.getParentIndex(index);
        // 父节点大于插入值，则交换位置
        while( index > 0 && 
            this.compareFn(this.heap[parent],this.heap[index]) === 1 )
        {
            swap(this.heap, parent,index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }
    
    size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    findMinimum() {
        // 最小堆的根元素即为最小值
        return this.isEmpty() ? undefined : this.heap[0];
    }

    // 移除堆中的最大值或最小值
    extract() {
        if(this.isEmpty()) {
            return undefined;
        }
        if(this.size() === 1) {
            // shift移除第一个元素并返回值（数组方法）
            return this.heap.shift();
        }
        const removedValue = this.heap[0];
        // 将最后一个元素替换到首位
        this.heap[0] = this.heap.pop();
        // 从根节点开始进行下移调整
        this.siftDown(0);
        return removedValue;
    }

    // 下移操作（堆化）
    siftDown(index) {
        // 当前节点索引
        let element = index;
        // 获取左右节点的索引
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        // 把当前节点与左右节点进行比较，若大于其中一个,则把当前节点和它进行交换
        if(
            left < size &&
            this.compareFn(this.heap[element], this.heap[left]) === 1
        ){
            element = left;
        }
        if(
            right < size && 
            this.compareFn(this.heap[element], this.heap[right] === 1) 
        ){
            element = right;
        }
        // 验证当前节点是否为最小节点（即element无发生变化），若是则不用交换
        if(index !== element) {
            // 将当前节点和最小子节点进行交换
            swap(this.heap, index, element);
            // 继续下沉，看是否需要调整
            this.siftDown(element);
        }
    }
}