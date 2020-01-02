import MinHeap from './MinHeap.js';
import { defaultCompare } from './modules/until.js';

function reverseCompare(compareFn) {
	return (a, b) => compareFn(b, a);
}

export default class MaxHeap extends MinHeap{
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = reverseCompare(compareFn);
    }
    
    findMaxmum() {
        return super.findMinimum();
    }
}