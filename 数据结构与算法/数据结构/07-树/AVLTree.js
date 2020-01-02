import BinarySearchTree from './BinarySearchTree.js';
import { defaultCompare } from './modules/until.js';
import{ Node } from './modules/Node.js';

export default class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
		super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    // 计算一个节点高度的代码：
    getNodeHeight(node) {
        if(node == null) {
            return -1;
        }
        // 返回左子树和右子树中高度较大者
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }

    // 计算一个节点的平衡因子并返回值
    getBalanceFactor(node) {
        // 平衡因子 = 左子节点高度 - 右子节点高度
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        // 根据平衡因子数值，判断当前树的状态
        switch(heightDifference) {
            // 右子树比左子树高，失衡，需要通过旋转平衡
            case -2:
                return 'unbalanced_right';
            // 右子树比左子树高，但在可接收范围内，略微失衡，可不调整
            case -1:
                return 'slightly_unbalanced_right';
            // 左子树比右子树高，但在可接收范围内，略微失衡，可不调整
            case 1:
                return 'slightly_unbalanced_left';
            // 左子树比右子树高，失衡，需要通过旋转平衡
            case 2:
                return 'unbalanced_left';
            // 平衡状态
            default:
                return 'balanced';
        }
    }

    /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
    // 向右的单旋转
    rotationLL(node) {
        // 将传入节点的左子节点设为temp节点
        const temp = node.left;
        // 将传入节点旋转到temp节点的右子节点
        node.left = temp.right;
        temp.right = node;
        return temp;
    }

    /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
    // 向左的单旋转
    rotationRR(node) {
        // 将传入节点的右子节点设为temp节点
        const temp = node.right;
        // 将传入节点旋转到temp节点的左子节点
        node.right = temp.left;
        temp.left = node;
        return temp;
    }

    rotationLR(node) {
        // 先进行一次左单旋（RR）旋转
        node.left = this.rotationRR(node.left);
        // 再进行一次右单旋（LL）旋转
        return this.rotationLL(node);
    }

    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    // 插入一个新节点
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        // 像在BST树中一样插入节点
        if(node == null) {
            // 若根元素为空，则直接添加元素即可
            return new Node(key);
        }else if(this.compareFn(key, node.key) === -1){
            // 插入节点小于当前节点
            node.left = this.insertNode(node.left, key);
        }else if(this.compareFn(key, node.key) === 1) {
            // 插入节点大于当前节点
            node.right = this.insertNode(node.right, key);
        }else {
            // 重复的键
            return node;
        }
        
        // 如果需要，将树进行平衡操作
        const balanceFactor = this.getBalanceFactor(node);
        // 左子树比右子树高，失衡，需要通过旋转平衡
        if(balanceFactor === 'unbalanced_left') {
            if(this.compareFn(key, node.left.key) === -1) {
                // 若插入的节点比当前节点的左节点小，则为LL情况
                node = this.rotationLL(node);
            } else {
                // 若插入的节点比当前节点的左节点大，则为LR情况
                return this.rotationLR(node);
            }
        }
        // 右子树比左子树高，失衡，需要通过旋转平衡
        if(balanceFactor === 'unbalanced_right') {
            if(this.compareFn(key, node.right.key) === 1) {
                // 若插入的节点比当前节点的左节点小，则为RR情况
                node = this.rotationRR(node);
            }else{
                // 若插入的节点比当前节点的左节点大，则为RL情况
                return this.rotationRL(node);
            }
        }
        return node;
    }

    remove(key) {
        this.root = this.removeNode(this.root, key);
    }
    // 移除一个节点
    removeNode(node,key) {
        node = super.removeNode(node, key);
        if(node == null) {
            return node;	// null,不需要进行平衡
        }
        // 检查树是否平衡
        const balanceFactor = this.getBalanceFactor(node);
        // 左侧子树不平衡
        if(balanceFactor == 'unbalanced_left'){
            const balanceFactorLeft = this.getBalanceFactor(node.left);
            // 左侧子树向左不平衡
            if( balanceFactorLeft === 'balanced' || 
                balanceFactorLeft === 'slightly_unbalanced_left')
            {
                return this.rotationLL(node);
            }
            // 左侧子树向右不平衡
            if( balanceFactorLeft === 'slightly_unbalanced_right')
            { 
                return this.rotationLR(node.left);
            }
        }
        // 右侧子树不平衡
        if (balanceFactor === 'unbalanced_right') {
            const balanceFactorRight = this.getBalanceFactor(node.right);
            // 右侧子树向右不平衡
            if ( balanceFactorRight === 'balanced' ||
                 balanceFactorRight === 'slightly_unbalanced_right')
            {
                return this.rotationRR(node); // {12}
            }
            // 右侧子树向左不平衡
            if ( balanceFactorRight === 'slightly_unbalanced_left')
            {
                return this.rotationRL(node.right);
            }
        }
        return node;
    }
}