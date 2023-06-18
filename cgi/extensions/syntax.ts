export const len: Function = <T>(arr: Array<T> | string): number => arr.length;

export const swap: Function = <T>(arr: any[], i: number, j: number): Array<T> => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

export const blanks: Function = () => ["", '', null, undefined];

export const sumOf: Function = (arr: number[]): number => {
    let sum: number = 0;
    let i: number = 0;
    loop(len(arr), () => {
        sum += arr[i++];
    })
    return sum;
}

export const arrayIncludes: Function = (arr: unknown[], key: unknown): boolean => {
    for (let i: number = 0; i < len(arr); i++) if (arr[i] === key) return true;
    return false;
}

export const isBlank: Function = (input: unknown): boolean => !input || isNull(input) || input == "" || input == undefined;

export const triple: Function = (n: number): number => n * 3;

export const pow: Function = (base: number, exp: number): number => Math.pow(base, exp);

export const meanOf: Function = (arr: number[]): number => sumOf(arr) / len(arr);

export const isFloat: Function = (num: number): boolean => num % 1 !== 0;

export const remove_byIndex: Function = (arr: unknown[], index: number): unknown[] => arr.splice(index, 1);

export const remove_byElement: Function = (arr: unknown[], element: unknown): unknown[] => arr.filter((el) => el !== element);

export const toDecimal: Function = (num: unknown): number => parseInt(stringify(num), 10);

export const toBinary: Function = (num: unknown): string => stringify(parseInt(stringify(num), 2));

export const toHex: Function = (num: unknown): string => stringify(parseInt(stringify(num), 16));

export const toInt: Function = (obj: unknown): number => {
    if (typeof obj === 'number') return Math.floor(obj);
    else if (typeof obj === 'string') return parseInt(obj, 10);
    else return 0;
}

export const abs: Function = (num: number): number => Math.abs(num);

export const loop: Function = (count: number, callback: Function): void => { for (let i = 0; i < count; i++) callback(i); }

export const max: Function = (arr: number[]): number => Math.max(...arr);

export const min: Function = (arr: number[]): number => Math.min(...arr);

export const print: Function = (input: unknown, count: number = 1): void => {
    loop(count, () => {
        console.log(stringify(input));
    });
}

export const isJSON: Function = (obj: unknown): boolean => {
    try {
        if (typeof obj === 'string') JSON.parse(obj);
        else return false;
        return true;
    } catch (e) {
        return false;
    }
}

export const stringify: Function = (obj: any): string => {
    let stringified: string = '';
    if (Array.isArray(obj)) stringified = '[ ' + obj.join(', ') + ' ]';
    else if (isJSON(obj)) stringified = JSON.stringify(obj);
    else if (typeof obj === 'string') return obj;
    else if (typeof obj === 'undefined' || obj === null) return '';
    else stringified = obj.toString();
    return stringified;
}

export const insertionSort: Function = (arr: any): any[] => {
    for (let i: number = 1; i < len(arr); i++) {
        let k: number = arr[i];
        let j: number = i - 1;
        while (j >= 0 && arr[j] > k) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = k;
    }
    return arr;
}

export const selectionSort: Function = <T>(arr: Array<T>): Array<T> => {
    for (let i: number = 0; i < len(arr) - 1; i++) {
        let min: number = i;
        for (let j: number = i + 1; j < len(arr); j++) if (arr[j] < arr[min]) min = j;
        swap(arr, min, i);
    }
    return arr;
}

export function sort(arr: any[]): any[] {
    return mergeSort(arr);
}

export const mergeSort: Function = <T>(arr: Array<T>): Array<T> => {
    const half = len(arr) / 2;
    if (len(arr) < 2) return arr;

    const left = arr.splice(0, half);
    return merge(mergeSort(left), mergeSort(arr));
}

const merge: Function = <T>(l: Array<T>, r: Array<T>): Array<T> => {
    let arr: any[] = [];
    while (len(l) && len(r)) {
        if (l[0] < r[0]) arr.push(l.shift());
        else arr.push(r.shift());
    }
    return [...arr, ...l, ...r];
}

export const floor: Function = (num: number): number => Math.floor(num);

export const ceiling: Function = (num: number): number => Math.ceil(num);

export const halved: Function = (num: number): number => num / 2;

export const searchIn: Function = <T>(arr: Array<T>, _for: unknown): number => {
    for (let i: number = 0; i < len(arr); i++) if (arr[i] === _for) return i;
    return -1;
}

export const sqrt: Function = (num: number): number => Math.sqrt(num);

export const logBASE: Function = (base: number, n: number): number => Math.log(n) / Math.log(base);

export function scrambleArray<T>(array: T[]): T[] {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
}

export const arrayEquals: Function = <T>(arr1: T[], arr2: T[]): boolean => {
    if (len(arr1) !== len(arr2)) return false;
    for (let i: number = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
    return true;
}

export const isInt: Function = (obj: unknown): obj is number => typeof obj === 'number';

export const isString: Function = (obj: unknown): obj is string => typeof obj === 'string';

export const isBool: Function = (obj: unknown): obj is boolean => typeof obj === 'boolean';

export const isFunc: Function = (obj: unknown): obj is Function => typeof obj === 'function';

export const isObject: Function = (obj: unknown): obj is object => typeof obj === 'object';

export const isNull: Function = (obj: unknown): obj is null => obj === null;

export const isUndefined: Function = (obj: unknown): obj is undefined => obj === undefined;

export const isEmpty: Function = <T>(obj: Array<T> | string): boolean => len(obj) === 0;

export const isArray: Function = (obj: any): boolean => Array.isArray(obj);

export const compareWithTypes: Function = (a: unknown, b: unknown): boolean => a === b;

export const compareWithoutTypes: Function = (a: unknown, b: unknown): boolean => a == b;

export const JSONIncludesKey: Function = (arr: JSON, key: string): boolean => key in arr;

export const jsonify: Function = (input: string): JSON | null => isJSON(input) ? JSON.parse(input) : null;

export const supertrim: Function = (input: string): string => {
    input = input.replace(/\r?\n|\r/g, "");
    input = input.trim();
    return input;
}
