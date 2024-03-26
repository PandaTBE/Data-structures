import { HashTable } from './hash-table';

describe('Проверка методов HashTable', () => {
    let hashTable = new HashTable(50);

    beforeEach(() => {
        hashTable = new HashTable(50);
    });

    test('Проверка метода set', () => {
        hashTable.set('name', 'Nikita');
        hashTable.set('eman', 'test');
        expect(hashTable.get('name')).toBe('Nikita');
        expect(hashTable.get('eman')).toBe('test');
        expect(hashTable.get('emanw')).toBeUndefined();
    });

    test('Проверка метода remove', () => {
        hashTable.set('name', 'Nikita');
        hashTable.set('eman', 'test');
        hashTable.set('12', '12');
        hashTable.set('134', '134');

        hashTable.remove('name');
        hashTable.remove('12');
        expect(hashTable.get('name')).toBeUndefined();
        expect(hashTable.get('12')).toBeUndefined();
    });
});
