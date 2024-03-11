import { DoublyLinkedList } from './doubly-linked-list';

describe('Проверка работы методов Doubly Linked List', () => {
    let list = new DoublyLinkedList();

    beforeEach(() => {
        list = new DoublyLinkedList();
    });

    test('Проверка prepend', () => {
        expect(list.prepend('a').toString()).toBe('a');
        expect(list.head?.toString()).toBe('a');
        expect(list.tail?.toString()).toBe('a');
        expect(list.prepend('b').toString()).toBe('b,a');
        expect(list.head?.toString()).toBe('b');
        expect(list.tail?.toString()).toBe('a');
        expect(list.tail?.previous?.toString()).toBe('b');
    });

    test('Проверка append', () => {
        expect(list.append('a').toString()).toBe('a');
        expect(list.head?.toString()).toBe('a');
        expect(list.tail?.toString()).toBe('a');
        expect(list.head?.next).toBe(null);
        expect(list.tail?.previous).toBe(null);

        expect(list.append('b').toString()).toBe('a,b');
        expect(list.tail?.toString()).toBe('b');
        expect(list.tail?.previous?.toString()).toBe('a');
        expect(list.head?.next?.toString()).toBe('b');
    });

    test('Проверка delete', () => {
        expect(list.delete('a')).toBe(null);

        list.append('a');

        expect(list.delete('a')?.toString()).toBe('a');
        expect(list.head).toBe(null);
        expect(list.tail).toBe(null);

        list.append('a').append('a');
        expect(list.delete('a')?.toString()).toBe('a');
        expect(list.head).toBe(null);
        expect(list.tail).toBe(null);

        list.append('a').append('b').append('a');
        expect(list.delete('a')?.toString()).toBe('a');
        expect(list.head?.toString()).toBe('b');
        expect(list.tail?.toString()).toBe('b');
    });

    test('Проверка метода find', () => {
        list.append('a').append('b');

        expect(list.find()).toBe(null);
        expect(list.find('c')).toBe(null);
        expect(list.find('a')?.toString()).toBe('a');
        expect(list.find('b')?.toString()).toBe('b');
    });

    test('Проверка метода deleteTail', () => {
        expect(list.deleteTail()).toBe(null);
        list.append('a');

        expect(list.deleteTail()?.toString()).toBe('a');
        expect(list.head).toBe(null);
        expect(list.tail).toBe(null);

        list.append('a').append('b');
        expect(list.deleteTail()?.toString()).toBe('b');
        expect(list.tail?.toString()).toBe('a');
        expect(list.head?.toString()).toBe('a');
        expect(list.tail?.next).toBe(null);
    });

    test('Проверка метода deleteHead', () => {
        expect(list.deleteHead()).toBe(null);
        list.append('a');
        expect(list.deleteHead()?.toString()).toBe('a');
        expect(list.head).toBe(null);
        expect(list.tail).toBe(null);

        list.append('a').append('b');
        expect(list.deleteHead()?.toString()).toBe('a');
        expect(list.tail?.toString()).toBe('b');
        expect(list.head?.toString()).toBe('b');
        expect(list.tail?.next).toBe(null);
        expect(list.head?.previous).toBe(null);
    });

    test('Проверка метода fromArray', () => {
        expect(list.fromArray(['a', 'b', 'c', 'd']).toString()).toBe('a,b,c,d');
    });

    test('Проверка метода reverse', () => {
        list.fromArray(['a', 'b', 'c', 'd']);
        expect(list.reverse().toString()).toBe('d,c,b,a');
        expect(list.head?.toString()).toBe('d');
        expect(list.tail?.toString()).toBe('a');
    });
});
