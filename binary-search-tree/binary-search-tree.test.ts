import { BinarySearchTree } from './binary-search-tree';

describe('Проверка методов работы Binary Search Tree', () => {
    let binarySearchTree = new BinarySearchTree();

    beforeEach(() => {
        binarySearchTree = new BinarySearchTree();
    });

    test('Проверка isEmpty', () => {
        expect(binarySearchTree.isEmpty()).toBeTruthy();
        expect(binarySearchTree.insert(5)).toBeFalsy();
    });

    test('Проверка метода search', () => {
        expect(binarySearchTree.search(binarySearchTree.root, 5)).toBeFalsy();
        binarySearchTree.insert(5);
        binarySearchTree.insert(10);
        binarySearchTree.insert(55);

        expect(binarySearchTree.search(binarySearchTree.root, 5)).toBeTruthy();
        expect(binarySearchTree.search(binarySearchTree.root, 10)).toBeTruthy();
        expect(binarySearchTree.search(binarySearchTree.root, 15)).toBeFalsy();
        expect(binarySearchTree.search(binarySearchTree.root, 55)).toBeTruthy();
    });
});
