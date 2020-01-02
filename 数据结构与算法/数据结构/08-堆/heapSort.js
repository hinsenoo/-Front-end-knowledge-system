/*堆排序算法
* @method heapSort
* @param {Array} array 待排序数组
* @param {Function} compareFn 比较函数（默认值为内置的比较函数）
*/
export default function heapSort(array, compareFn = defaultCompare) {
    // 获取数组长度作为堆的大小
    let heapSize = array.length;
    // 初始化堆
    buildMaxHeap(array, compareFn);
    console.log(array);
    while(heapSize > 1) {
        // 将第一个节点（最大值）替换为堆最后一个元素
        swap(array, 0, --heapSize);
        // 进行堆化，直到堆的大小为 1;
        heapify(array, 0, heapSize, compareFn);
    }
    return array;
}

/*初始化堆
* @method buildMaxHeap
* @param {Array} array 待构建成堆的数组
* @param {Function} compareFn 比较函数（默认值为内置的比较函数）
*/
function buildMaxHeap(array, compareFn) {
    // 对下标从 n/2 到 1 的数据进行堆化，
    // 因为下标 n/2 + 1 到 n 的节点是叶子节点，不需要堆化
	for(let i = Math.floor(array.length / 2); i >= 0; --i){
        heapify(array, i, array.length, compareFn);
        console.log(array);
    }
    return array;
}

/*比较函数
* @method defaultCompare
*/
function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a > b ? 1 : -1;
}
/*交换函数
* @method defaultCompare
*/
function swap(array, a, b){
    // es6 解构赋值
    [array[a],array[b]] = [array[b], array[a]];
	// const temp = array[a];
    // array[a] = array[b];
    // array[b] = temp;
}
/*堆化(下沉)
* @method heapify
* @param {Array} array 待构建成堆的数组
* @param {Function} compareFn 比较函数（默认值为内置的比较函数）
*/
function heapify(array, index, heapSize, compareFn) {
    // 假设最大值为当前节点
    let largest = index;
    // 获取左右节点的索引
    const left = (2 * index) + 1;
    const right = (2 * index) + 2;
    // 把当前节点与左右节点进行比较，若小于其中一个,则把当前节点和它进行交换
    if(
        left < heapSize &&
        compareFn(array[left], array[largest]) > 0
    ){
        largest = left;
    }
    if(
        right < heapSize && 
        compareFn(array[right], array[largest]) > 0
    ){
        largest = right;
    }
    // 验证当前节点是否为最大节点（即element无发生变化），若是则不用交换
    if(index !== largest) {
        // 将当前节点和最小子节点进行交换
		swap(array, index, largest);
        // 继续堆化(下沉)，看是否需要调整
        heapify(largest);
    }
}