type TValue = any;

type THashTableItem = [string, TValue][] | undefined;

interface IHashTable {
    /**
     * Сама хэш таблицы
     */
    table: THashTableItem[];
    /**
     * Размер хэш таблицы
     */
    size: number;
    /**
     * Метод для добавления значения
     */
    set(key: string, value: any): void;
    /**
     * Метод для получения значения по ключу
     */
    get(key: string): undefined | TValue;
    /**
     * Метод для удаления значения
     */
    remove(key: string): void;
    /**
     * Метод для отображения таблицы
     */
    display(): void;
}

export class HashTable implements IHashTable {
    table: THashTableItem[];

    constructor(public size: number) {
        this.table = new Array(size);
    }

    /**
     * Функция хеширования
     */
    private hash(key: string): number {
        let total = 0;

        for (let i = 0; i < key.length; i++) {
            total += key.charCodeAt(i);
        }

        return total % this.size;
    }

    set(key: string, value: any) {
        const index = this.hash(key);
        const bucket = this.table[index];

        if (!bucket) {
            this.table[index] = [[key, value]];
        } else {
            const sameKeyItem = bucket.find((item) => item[0] === key);
            if (sameKeyItem) {
                sameKeyItem[1] = value;
            } else {
                bucket.push([key, value]);
            }
        }
    }

    get(key: string) {
        const index = this.hash(key);
        const bucket = this.table[index];

        if (bucket) {
            const sameKeyItem = bucket.find((item) => item[0] === key);

            if (sameKeyItem) {
                return sameKeyItem[1];
            }
        }

        return undefined;
    }

    remove(key: string) {
        const index = this.hash(key);
        const bucket = this.table[index];

        if (bucket) {
            const sameKeyItem = bucket.find((item) => item[0] === key);

            if (sameKeyItem) {
                bucket.splice(bucket.indexOf(sameKeyItem), 1);
            }
        }
    }

    display() {
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i]) {
                console.log(i, this.table[i]);
            }
        }
    }
}
