interface IAdjacencyList {
    [x: string]: Set<string>;
}

interface IGraph {
    /**
     * Сам граф
     */
    adjacencyList: IAdjacencyList;
    /**
     * Метод для добавления вершины
     */
    addVertex(vertex: string): void;
    /**
     * Метод для добавления ребра
     */
    addEdge(vertex1: string, vertex2: string): void;
    /**
     * Метод для удаления ребра
     */
    removeEdge(vertex1: string, vertex2: string): void;
    /**
     * Метод для удаления вершины
     */
    removeVertex(vertex: string): void;
    /**
     * Метод для проверки наличия ребра
     */
    hasEdge(vertex1: string, vertex2: string): boolean;
    /**
     * Метод для отображения графа
     */
    display(): void;
}

export class Graph implements IGraph {
    adjacencyList: IAdjacencyList = {};

    addVertex(vertex: string): void {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = new Set();
        }
    }
    addEdge(vertex1: string, vertex2: string): void {
        if (!this.adjacencyList[vertex1]) {
            this.addVertex(vertex1);
        }

        if (!this.adjacencyList[vertex2]) {
            this.addVertex(vertex2);
        }
        this.adjacencyList[vertex1].add(vertex2);
        this.adjacencyList[vertex2].add(vertex1);
    }
    removeEdge(vertex1: string, vertex2: string): void {
        this.adjacencyList[vertex1].delete(vertex2);
        this.adjacencyList[vertex2].delete(vertex1);
    }
    removeVertex(vertex: string): void {
        if (this.adjacencyList[vertex]) {
            for (let adjacencyVertex of this.adjacencyList[vertex]) {
                this.removeEdge(vertex, adjacencyVertex);
            }
            delete this.adjacencyList[vertex];
        }
    }
    hasEdge(vertex1: string, vertex2: string): boolean {
        return (
            this.adjacencyList[vertex1]?.has(vertex2) &&
            this.adjacencyList[vertex2]?.has(vertex1)
        );
    }
    display(): void {
        for (let vertex in this.adjacencyList) {
            console.log(vertex + ' -> ' + [...this.adjacencyList[vertex]]);
        }
    }
}
