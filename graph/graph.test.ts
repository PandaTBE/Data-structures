import { Graph } from './graph';

describe('Проверка методов Graph', () => {
    let graph = new Graph();

    beforeEach(() => {
        graph = new Graph();
    });

    test('Проверка метода addEdge', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        expect(graph.hasEdge('A', 'B')).toBeTruthy();
        expect(graph.hasEdge('A', 'C')).toBeFalsy();
        expect(graph.hasEdge('A', 'D')).toBeFalsy();
    });

    test('Проверка метода removeEdge', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');

        graph.removeEdge('A', 'B');
        expect(graph.hasEdge('A', 'B')).toBeFalsy();
    });

    test('Проверка метода removeVertex', () => {
        graph.addEdge('A', 'B');
        graph.addEdge('B', 'C');
        graph.removeVertex('B');

        expect(graph.hasEdge('A', 'B')).toBeFalsy();
        expect(graph.hasEdge('A', 'C')).toBeFalsy();
        expect(graph.hasEdge('B', 'C')).toBeFalsy();

        graph.display();
    });
});
