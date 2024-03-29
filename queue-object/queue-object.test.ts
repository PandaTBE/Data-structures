import { QueueObject } from './queue-object';

describe('Проверка методов QueueObject', () => {
    let queue = new QueueObject();

    beforeEach(() => {
        queue = new QueueObject();
    });

    test('Проверка метода enqueue', () => {
        queue.enqueue(10);

        expect(queue.rear).toBe(1);
        expect(queue.items[queue.front]).toBe(10);

        queue.enqueue(20);

        expect(queue.rear).toBe(2);
        expect(queue.items[queue.front]).toBe(10);
    });

    test('Проверка метода dequeue', () => {
        queue.enqueue(10);
        queue.enqueue(20);

        expect(queue.dequeue()).toBe(10);
        expect(queue.front).toBe(1);
        expect(queue.items[queue.front]).toBe(20);
    });

    test('Проверка метода peek', () => {
        queue.enqueue(10);
        queue.enqueue(20);

        expect(queue.peek()).toBe(10);
        expect(queue.dequeue()).toBe(10);
        expect(queue.peek()).toBe(20);
    });

    test('Проверка метода size', () => {
        expect(queue.size()).toBe(0);
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        expect(queue.size()).toBe(3);
    });

    test('Проверка метода isEmpty', () => {
        expect(queue.isEmpty()).toBeTruthy();
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        expect(queue.isEmpty()).toBeFalsy();
    });

    test('Проверка метода print', () => {
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        queue.print();
    });
});
