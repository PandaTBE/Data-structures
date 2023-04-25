import { LinkedList } from './linked-list';

describe('Проверка работы методов Linked list', () => {
    let list = new LinkedList();

    beforeEach(() => {
        list = new LinkedList();
    });

    test('Проверка append', () => {
        expect(list.append('a').toString()).toBe('a');
        expect(list.head?.toString()).toBe('a');
        expect(list.tail?.toString()).toBe('a');
        list.append('b');
        expect(list.tail?.toString()).toBe('b');
        expect(list.toString()).toBe('a,b');
    });

    test('Проверка prepend', () => {
        expect(list.prepend('a').toString()).toBe('a');
        expect(list.head?.toString()).toBe('a');
        expect(list.tail?.toString()).toBe('a');
        expect(list.prepend('b').toString()).toBe('b,a');
        expect(list.head?.toString()).toBe('b');
        expect(list.tail?.toString()).toBe('a');
    });

    test('Проверка find', () => {
        expect(list.find('a')).toBe(null);
        list.append('a').append('b').append('c');
        expect(list.find('a')?.toString()).toBe('a');
        expect(list.find('c')?.toString()).toBe('c');
        expect(list.find('x')).toBe(null);
    });

    test('Проверка delete', () => {
        list.append('a').append('a').append('a'); // a,a,a

        expect(list.delete('a')?.toString()).toBe('a'); // ''
        expect(list.toString()).toBe('');

        list.append('a').append('b').append('c'); // a,b,c
        list.delete('b');

        expect(list.toString()).toBe('a,c'); // a,c

        list.prepend('c'); // c,a,c
        list.delete('c'); // a

        expect(list.toString()).toBe('a');
        expect(list.head?.toString()).toBe('a');
        expect(list.tail?.toString()).toBe('a');
    });

    test('Проверка insertAfter', () => {
        list.append('a').append('b').append('c'); // a,b,c

        const bNode = list.find('b');
        expect(list.insertAfter('x', bNode).toString()).toBe('a,b,x,c');

        const cNode = list.find('c');
        expect(list.insertAfter('z', cNode).toString()).toBe('a,b,x,c,z');
        expect(list.tail?.toString()).toBe('z');
    });

    test('Проверка deleteTail', () => {
        expect(list.deleteTail()).toBe(null);

        expect(list.append('a').deleteTail()?.toString()).toBe('a');
        expect(list.head).toBe(null);
        expect(list.tail).toBe(null);

        list.append('a').append('b').append('c');
        list.deleteTail();

        expect(list.toString()).toBe('a,b');
        expect(list.tail?.toString()).toBe('b');
    });

    test('Проверка deleteHead', () => {
        expect(list.deleteHead()).toBe(null);

        expect(list.append('a').deleteHead()?.toString()).toBe('a');
        expect(list.head).toBe(null);
        expect(list.tail).toBe(null);

        list.append('a').append('b').append('c');
        list.deleteHead();

        expect(list.toString()).toBe('b,c');
        expect(list.head?.toString()).toBe('b');
    });
});
