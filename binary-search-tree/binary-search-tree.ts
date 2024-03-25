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
    /**
     * Один из способов обхода дерева в ширину (BFS)
     * для дерева в котором по порядку вставлялись элементы (10, 5, 15, 3, 7) вывод будет 10, 5, 15, 3, 7
     */
    levelOrder(): void;
    /**
     * Метод возвращает минимальное значение дерева (крайний левый узел)
     */
    min(root: IBinarySearchTreeNode | null): TValue | null;
    /**
     * Метод возвращает максимальное значение дерева (крайний правый узел)
     */
    max(root: IBinarySearchTreeNode | null): TValue | null;
    /**
     * Метод для удаления узла по переданному значению
     */
    delete(value: TValue): void;
    /**
     * Метод для удаления ноды из дерева или поддерева
     */
    deleteNode(
        root: IBinarySearchTreeNode | null,
        value: TValue,
    ): IBinarySearchTreeNode | null;
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
    levelOrder(): void {
        /** Для оптимизации можно использовать структуру данных очередь */
        const queue: IBinarySearchTreeNode[] = [];
        if (this.root) {
            queue.push(this.root);
        }
        while (queue.length) {
            const current = queue.shift();
            console.log(current?.value);

            if (current?.left) {
                queue.push(current.left);
            }
            if (current?.right) {
                queue.push(current.right);
            }
        }
    }
    min(root: IBinarySearchTreeNode | null): TValue | null {
        if (!root) return null;
        if (!root.left) {
            return root.value;
        } else {
            return this.min(root.left);
        }
    }
    max(root: IBinarySearchTreeNode | null): TValue | null {
        if (!root) return null;
        if (!root.right) {
            return root.value;
        } else {
            return this.max(root.right);
        }
    }
    delete(value: TValue) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(root: IBinarySearchTreeNode | null, value: TValue) {
        if (root === null) {
            return root;
        }
        if (value < root.value) {
            root.left = this.deleteNode(root.left, value);
        } else if (value > root.value) {
            root.right = this.deleteNode(root.right, value);
        } else {
            if (!root.left && !root.right) {
                return null;
            }
            if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            }
            root.value = this.min(root.right) as TValue;
            root.right = this.deleteNode(root.right, root.value);
        }
        return root;
    }
}
