export type TValue = string | number;

export interface IBinarySearchTreeNode {
    value: TValue;
    left: IBinarySearchTreeNode | null;
    right: IBinarySearchTreeNode | null;
}

export class BinarySearchTreeNode implements IBinarySearchTreeNode {
    left: IBinarySearchTreeNode | null = null;
    right: IBinarySearchTreeNode | null = null;

    constructor(public value: TValue) {}
}

export interface IBinarySearchTree {
    root: IBinarySearchTreeNode | null;
    /** Метод для определения дерево пусто или нет */
    isEmpty(): boolean;
    /** Метод для вставки значения в дерево */
    insert(value: TValue): void;
    /** Рекурсивный метод для вставки узла в дерево */
    insertNode(
        root: IBinarySearchTreeNode,
        newNode: IBinarySearchTreeNode,
    ): void;
    /** Рекурсивный метод поиска значения. Вернет true, если такое значение есть, иначе вернет false */
    search(root: IBinarySearchTreeNode | null, value: TValue): boolean;
    /**
     * Один из способов обхода дерева в глубину
     * для дерева в котором по порядку вставлялись элементы (10, 5, 15, 3, 7) вывод будет 10, 5, 3, 7, 15
     */
    preOrder(root: IBinarySearchTreeNode | null): void;
    /**
     * Один из способов обхода дерева в глубину
     * для дерева в котором по порядку вставлялись элементы (10, 5, 15, 3, 7) вывод будет 3, 5, 7, 10, 15
     */
    inOrder(root: IBinarySearchTreeNode | null): void;
    /**
     * Один из способов обхода дерева в глубину
     * для дерева в котором по порядку вставлялись элементы (10, 5, 15, 3, 7) вывод будет 3, 7, 5, 15, 10
     */
    postOrder(root: IBinarySearchTreeNode | null): void;
}

export class BinarySearchTree implements IBinarySearchTree {
    root: IBinarySearchTreeNode | null = null;

    isEmpty(): boolean {
        return this.root === null;
    }

    insert(value: TValue): void {
        const newNode = new BinarySearchTreeNode(value);

        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(
        root: IBinarySearchTreeNode,
        newNode: IBinarySearchTreeNode,
    ): void {
        if (newNode.value < root.value) {
            if (!root.left) {
                root.left = newNode;
            } else {
                this.insertNode(root.left, newNode);
            }
        } else {
            if (!root.right) {
                root.right = newNode;
            } else {
                this.insertNode(root.right, newNode);
            }
        }
    }

    search(root: IBinarySearchTreeNode | null, value: TValue): boolean {
        if (!root) {
            return false;
        }

        if (root.value === value) {
            return true;
        }

        if (value < root.value) {
            return this.search(root.left, value);
        } else {
            return this.search(root.right, value);
        }
    }

    preOrder(root: IBinarySearchTreeNode | null): void {
        if (root) {
            console.log(root.value);
            this.preOrder(root.left);
            this.preOrder(root.right);
        }
    }

    inOrder(root: IBinarySearchTreeNode | null): void {
        if (root) {
            this.inOrder(root.left);
            console.log(root.value);
            this.inOrder(root.right);
        }
    }
    postOrder(root: IBinarySearchTreeNode | null): void {
        if (root) {
            this.postOrder(root.left);
            this.postOrder(root.right);
            console.log(root.value);
        }
    }
}
