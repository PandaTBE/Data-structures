export type Fn = (value: { [ket: string]: any }) => string;

export type Value = number | string | { [ket: string]: unknown };

export interface IDoublyLinkedListNode {
    value: Value;
    next: DoublyLinkedListNode | null;
    previous: DoublyLinkedListNode | null;
    toString(callback?: Fn): string;
}

export interface IDoublyLinkedList {
    head: DoublyLinkedListNode | null;
    tail: DoublyLinkedListNode | null;
    /**
     * Метод принимает значение в качестве аргумента и создаёт новый узел с этим значением,
     * помещая его в начало связного списка.
     */
    prepend(value: Value): DoublyLinkedList;
    /**
     * Метод принимает значение в качестве аргумента и создаёт новый узел с этим значением,
     * помещая его в конец связного списка.
     */
    append(value: Value): DoublyLinkedList;
    /**
     * Метод принимает значение в качестве аргумента, удаляет все узлы,
     * которые имеют указанное значение и возвращает последний удалённый узел.
     */
    delete(value: Value): DoublyLinkedListNode | null;
    /**
     * Метод принимает значение в качестве аргумента,
     * находит первый узел с таким же значением и возвращает его.
     */
    find(value?: Value | undefined): DoublyLinkedListNode | null;
    /**
     * Метод, который удаляет последний узел из списка и возвращает его.
     */
    deleteTail(): DoublyLinkedListNode | null;
    /**
     * Метод, который удаляет из списка первый узел и возвращает его.
     */
    deleteHead(): DoublyLinkedListNode | null;
    /**
     * Принимает массив значений в качестве аргумента и создаёт новые узлы из каждого элемента массива,
     * по очереди добавляя их в конец списка.
     */
    fromArray(values: Array<Value>): DoublyLinkedList;
    /**
     * Метод, что создаёт массив из всех узлов и возвращает его.
     */
    toArray(): DoublyLinkedListNode[];
    /**
     * принимает обратный вызов в качестве аргумента (не обязательно)
     * и создаёт строку из всех значений узлов.
     */
    toString(callback?: Fn): string;
    /**
     * Метод, создающий обратный список, сменой узлов местами.
     * Первый узел становится последним, а последний первым; все узлы и их ссылки меняются соответственно.
     */
    reverse(): DoublyLinkedList;
}

export class DoublyLinkedListNode implements IDoublyLinkedListNode {
    constructor(
        public value: Value,
        public next: DoublyLinkedListNode | null = null,
        public previous: DoublyLinkedListNode | null = null,
    ) {}

    toString(callback?: Fn | undefined): string {
        return callback
            ? callback(this.value as { [ket: string]: unknown })
            : `${this.value}`;
    }
}

export class DoublyLinkedList implements IDoublyLinkedList {
    head: DoublyLinkedListNode | null = null;
    tail: DoublyLinkedListNode | null = null;

    prepend(value: Value) {
        const newNode = new DoublyLinkedListNode(value, this.head);

        if (this.head) {
            this.head.previous = newNode;
        }

        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value: Value) {
        const newNode = new DoublyLinkedListNode(value, null, this.tail);

        if (this.tail) {
            this.tail.next = newNode;
        }

        newNode.previous = this.tail;

        this.tail = newNode;

        if (!this.head) {
            this.head = newNode;
        }
        return this;
    }

    delete(value: Value): null | IDoublyLinkedListNode {
        if (!this.head) {
            return null;
        }

        let deletedNode: null | IDoublyLinkedListNode = null;
        let currentNode = this.head as null | IDoublyLinkedListNode;

        while (currentNode) {
            if (currentNode.value === value) {
                deletedNode = currentNode;

                if (this.head === deletedNode) {
                    this.head = deletedNode.next;

                    if (this.head) {
                        this.head.previous = null;
                    }

                    /**
                     * Если все узлы в списке имеют одинаковое значение,
                     * которое передается в качестве аргумента,
                     * тогда все узлы будут удалены, поэтому tail необходимо обновить.
                     */
                    if (this.tail === deletedNode) {
                        this.tail = null;
                    }
                } else if (this.tail === deletedNode) {
                    this.tail = deletedNode.previous as IDoublyLinkedListNode;
                    this.tail.next = null;
                } else {
                    const prevNode =
                        deletedNode.previous as IDoublyLinkedListNode;
                    const nextNode = deletedNode.next as IDoublyLinkedListNode;

                    prevNode.next = nextNode;
                    nextNode.previous = prevNode;
                }
            }
            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    find(value?: Value | undefined): DoublyLinkedListNode | null {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head as DoublyLinkedListNode | null;

        while (currentNode) {
            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    deleteTail(): DoublyLinkedListNode | null {
        if (!this.head) {
            return null;
        }
        const deletedNode = this.tail;

        if (this.tail?.previous) {
            this.tail = this.tail.previous;
            this.tail.next = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedNode;
    }

    deleteHead(): DoublyLinkedListNode | null {
        if (!this.head) {
            return null;
        }

        const deletedNode = this.head;

        if (this.head.next) {
            this.head = this.head.next;
            this.head.previous = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedNode;
    }

    toArray() {
        const nodes: IDoublyLinkedListNode[] = [];

        let currentNode = this.head;

        /** Перебор всех узлов и добавление их в результирующий массив */
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    fromArray(values: Value[]): DoublyLinkedList {
        values.forEach((value) => this.append(value));
        return this;
    }

    reverse(): DoublyLinkedList {
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currentNode) {
            prevNode = currentNode.previous;
            nextNode = currentNode.next;

            currentNode.next = prevNode;
            currentNode.previous = nextNode;

            prevNode = currentNode;

            currentNode = nextNode;
        }

        this.tail = this.head;

        this.head = prevNode;

        return this;
    }

    toString(callback?: Fn) {
        return this.toArray()
            .map((node) => node.toString(callback))
            .toString();
    }
}
