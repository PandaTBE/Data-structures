type TValue = string | number;

interface IQueueObject {
    /**
     * Элементы очереди
     */
    items: { [index: string]: TValue };
    /**
     * Указатель на первый элемент
     */
    front: number;
    /**
     * Указатель на последний элемент
     */
    rear: number;
    /**
     * Метод для добавления элемента в очередь
     */
    enqueue(item: TValue): void;
    /**
     * Метод для удаления элемента из очереди
     */
    dequeue(): TValue;
    /**
     * Метод для получения первого элемента из очереди
     */
    peek(): TValue;
    /**
     * Метод для получения размера очереди
     */
    size(): number;
    /**
     * Метод для проверки очереди: пуста она или ннет
     */
    isEmpty(): boolean;
    /**
     * Метод для отображения очереди
     */
    print(): void;
}

export class QueueObject implements IQueueObject {
    items: { [index: string]: TValue } = {};
    front: number = 0;
    rear: number = 0;

    enqueue(item: TValue): void {
        this.items[this.rear] = item;
        this.rear++;
    }
    dequeue(): TValue {
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }
    peek(): TValue {
        return this.items[this.front];
    }
    size(): number {
        return this.rear - this.front;
    }
    isEmpty(): boolean {
        return this.rear - this.front === 0;
    }
    print(): void {
        console.log(this.items);
    }
}
