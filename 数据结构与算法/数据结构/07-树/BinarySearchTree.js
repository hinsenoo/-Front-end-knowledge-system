import { defaultCompare } from './modules/until.js';
import{ Node } from './modules/Node.js';

export default class BinarySearchTree {
	constructor(compare = defaultCompare) {
        this.compareFn = compare;	// 用来比较节点值
        this.root = null;			// Node 类型的根节点
    }

    insert(key) {
        if(this.root == null) {
            // 添加到根节点
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        // 使用构造函数的 compareFn 函数比较值
        if(this.compareFn(key, node.key) === -1 ) {
            // 当新节点的键小于当前节点的键，则检查当前节点的左侧子节点
            if(node.left == null) {
                // 若没有左侧子节点，则直接插入新的节点
                node.left = new Node(key);
            } else {
                // 若有左侧子节点，通过递归调用 insertNode 方法继续找到树的下一层
                // 在这里，下次要比较的节点将会是当前节点的左侧子节点（左侧节点子树）
                this.insertNode(node.left, key);
            }
        } else {
            // 当新节点的键大于或等于当前节点
            if(node.right == null) {
                // 若没有右侧子节点，则直接插入新的节点
                node.right = new Node(key);
            } else {
                // 若有，同样递归调用 insertNode 方法
                // 但是要用来和新节点比较的节点将会是右侧子节点（右侧节点子树）
                this.insertNode(node.right, key);
            }
        }
    }

    // 中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    // 辅助方法
    inOrderTraverseNode(node, callback) {
        if(node != null) { // 递归的基线条件
            // 遍历左子节点树，并执行回调函数操作
            this.inOrderTraverseNode(node.left, callback);
            // 对根节点执行回调函数操作
            callback(node.key);
            // 遍历右子节点树，并执行回调函数操作
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    // 先序遍历
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }
    // 辅助方法
    preOrderTraverseNode(node, callback) {
        if(node != null) {
            // 访问节点本身
            callback(node.key);
               // 访问左侧节点
            this.preOrderTraverseNode(node.left, callback);
            // 访问右侧节点
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    // 后序遍历
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    // 辅助方法
    postOrderTraverseNode(node, callback) {
        if(node != null) {
            // 访问左侧节点
            this.postOrderTraverseNode(node.left, callback);
            // 访问右侧节点
            this.postOrderTraverseNode(node.right, callback);
            // 访问当前节点
            callback(node.key);
        }
    }

    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while(current != null && current.right != null) {
            current = current.right;
        }  
        return current;
    }

    min() {
        return this.minNode(this.root);
    }
    // min 方法将会暴露给用户，调用minNode方法
    minNode(node) {
        let current = node;
        while(current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }

    // 检索特定的值
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        // 验证合法性
        if(node == null){
            return false;
        }
        if(this.compareFn(key, node.key) === -1) {
            // 找的键比当前节点小，则继续在左侧子树上搜索
            return this.searchNode(node.left, key);
        } else if(this.compareFn(key, node.key) === 1) {
            // 找的键比当前节点大，则继续在右侧子树上搜索
            return this.searchNode(node.right, key);
        }else {
            // 否则声明找的键和当前节点的键相等
            return true;
        }
    }

    // 移除一个节点
    remove(key) {
        // 把修改完的引用重新赋予节点
        this.root = this.removeNode(this.root, key); // {1}
    }
    removeNode(node, key) {
        // 开始检测节点为空，则说明键不存在于树，返回null
        if(node == null) {
            return null;
        }
        // 比较要找的键和当前节点的值的大小，小则往左子树，大则往右子树
        if (this.compareFn(key, node.key) === -1) { // {3}
            // 把修改完的引用重新赋予节点
            node.left = this.removeNode(node.left, key); // {4}
            return node; // {5}
        } else if (this.compareFn(key, node.key) === 1) { // {6}
            // 把修改完的引用重新赋予节点
            node.right = this.removeNode(node.right, key); // {7}
            return node; // {8}
        } else {
            // 找到元素 键等于node.key
            // 第一种情况,左右子节点都为空
            // 直接移除该节点
            if(node.left == null && node.right == null) {
                node = null;
                return node;
            }
            // 第二种情况，只有一个左节点或一个右子节点
            // 若左子节点为空，将右子节点赋值赋值给该节点
            // 若右子节点为空，将左子节点赋值赋值给该节点
            if(node.left == null) {
                node = node.right;
                return node;
            } else if(node.right == null) {
                node = node.left;
                return node;
            }
            
            // 第三种情况，左右子节点都存在
            // 在右子节点树中寻找的最小值，把该值赋值给当前节点，并在右子节点树中移除最小值
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }
}