type TNodeValue = string | number | { [key: string]: any };

class LinkedListNode {
    value: TNodeValue;
    next: null | LinkedListNode;

    constructor(value: TNodeValue, next: null | LinkedListNode = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback?: (value: TNodeValue) => string) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}

export class LinkedList {
    head: null | LinkedListNode = null;
    tail: null | LinkedListNode = null;

    /**
     * Принимает значение и создаёт новый узел с этим значением,
     * помещая его в конец связного списка
     */
    append(value: TNodeValue) {
        const newNode = new LinkedListNode(value);

        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        /**
         * Поле next у последнего элемента списка устанавливаем
         * равным новой ноде
         */
        this.tail.next = newNode;
        /**
         * Устанавливаем последний элемент равным новой ноде
         */
        this.tail = newNode;

        return this;
    }

    /**
     * Метод принимает значение в качестве аргумента
     * и создаёт новый узел с этим значением, помещая его в начало связного списка.
     */
    prepend(value: TNodeValue) {
        /**
         * Создаём новый узел, который будет новым head,
         * при создании передаем второй аргумент, который указывает
         * что его "next" будет текущий head,
         * так как новый узел будет стоять перед текущем head.
         */
        const newNode = new LinkedListNode(value, this.head);

        this.head = newNode;

        /**
         * Если у списка еще не было tail, то устанавливаем  tail
         * равным новой ноде
         */
        if (!this.tail) this.tail = newNode;

        return this;
    }

    /**
     * Метод принимает значение в качестве аргумента,
     * находит первый узел с таким же значением и возвращает его.
     */
    find(value: TNodeValue): null | LinkedListNode {
        /** Если нет head значит список пуст. */
        if (!this.head) return null;

        let currentNode: null | LinkedListNode = this.head;

        /** Перебираем все узлы в поиске значения. */
        while (currentNode) {
            if (currentNode.value === value) return currentNode;
            currentNode = currentNode.next;
        }
        return null;
    }

    /**
     * Метод принимает значение в качестве аргумента,
     * удаляет все узлы, которые имеют указанное значение и возвращает последний удалённый узел.
     */
    delete(value: TNodeValue): null | LinkedListNode {
        let deletedNode = null;

        /**
         * Если head должен быть удален, то делаем следующий узел новым head.
         */
        while (this.head && this.head.value === value) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        /**
         * Если следующий узел должен быть удален,
         * то перезаписывает next у текущего значением через 1 узел
         * (next.next)
         * Иначе перезаписываем текущий узел на следующий для итерации
         */
        while (currentNode && currentNode.next) {
            if (currentNode.next.value === value) {
                deletedNode = currentNode.next;
                currentNode.next = currentNode.next.next;
            } else {
                currentNode = currentNode.next;
            }
        }

        /**
         * Если нужно удалить tail, то перезаписываем tail
         * на currentNode. Так как после второго шага
         * currentNode будет последним узлом, который не
         * нужно удалять
         */
        if (this.tail && this.tail.value === value) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    /**
     * Метод добавляет значение после переданного узла
     */
    insertAfter(value: TNodeValue, prevNode: null | LinkedListNode) {
        /** Если не был передан узел, то возвращается неизмененный список */
        if (!prevNode) return this;

        /**
         * Создаем новый узел, next которого будет указывать на next
         * узла, после которого необходимо вставить новый узел
         */
        const newNode = new LinkedListNode(value, prevNode.next);

        /**
         * Меняем ссылку next у предыдущего узла на новый узел
         */
        prevNode.next = newNode;

        /**
         * Если новый узел указывает на null, то это означает, что
         * предыдущий узел был tail, поэтому перезаписываем tail на
         * новый узел
         */
        if (newNode.next === null) {
            this.tail = newNode;
        }

        return this;
    }

    /**
     * Метод, который удаляет последний узел из списка и возвращает его.
     */
    deleteTail(): null | LinkedListNode {
        /** Если нет tail, то список пуст */
        if (!this.tail) return null;

        let deletedNode = this.tail;

        /**
         * Если head и tail равны, то список состоит из одного узла
         */
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deletedNode;
        }

        let current = this.head;

        /**
         * Если в списке много элементов, то находим предпоследним и
         * устанавливаем его next в null
         */
        while (current && current.next) {
            if (current.next.next === null) {
                current.next = null;
            } else {
                current = current.next;
            }
        }

        this.tail = current;

        return deletedNode;
    }

    /**
     * Метод, который удаляет из списка первый узел и возвращает его.
     */
    deleteHead(): null | LinkedListNode {
        /** Если нет head, то список пуст */
        if (!this.head) return null;

        const deletedNode = this.head;

        /**
         * Если у head next не равен null, то устанавливаем
         * новый head в значение next.
         * Иначе устанавливаем head и tail в null,
         * так как в списке всего 1 узел
         */
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedNode;
    }

    /**
     * Создать массив из всех узлов
     */
    toArray() {
        const nodes: LinkedListNode[] = [];

        let currentNode = this.head;

        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * Преобразует список в строку
     */
    toString(callback?: (value: TNodeValue) => string) {
        return this.toArray()
            .map((node) => node.toString(callback))
            .toString();
    }
}
