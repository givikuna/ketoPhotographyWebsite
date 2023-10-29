export function to_vec<T>(x: T[] | string | Vec<T>): Vec<T> {
    return new Vec(x);
}

class Vec<T> {
    arr: T[];

    constructor(arr: T[] | string | Vec<T>) {
        this.arr =
            arr instanceof Vec
                ? arr.clone().unwrap()
                : typeof arr === "string"
                ? (arr.split("") as T[])
                : arr;
        return this;
    }

    at(n: number): T {
        if (n < 0) {
            return this.arr[this.arr.length + n];
        } else {
            return this.arr[n];
        }
    }

    unwrap(): T[] {
        return [...this.arr];
    }

    clone(): Vec<T> {
        return new Vec([...this.arr]) as Vec<T>;
    }

    copy(): Vec<T> {
        return this.clone();
    }

    sort(): Vec<T> {
        /*
        const quick_sort: (arr: T[]) => T[] = (arr: T[]): T[] => {
            if (arr.length <= 1) {
                return arr;
            }

            let pivot: T = arr[0];
            let left_arr: T[] = [];
            let right_arr: T[] = [];

            for (let i: number = 0; i < arr.length; i++) {
                if (arr[i] < pivot) {
                    left_arr.push(arr[i]);
                } else {
                    right_arr.push(arr[i]);
                }
            }

            return [...quick_sort(left_arr), ...quick_sort(right_arr)];
        };
        */

        return new Vec(
            ((f: (h: typeof f) => (arr: T[]) => T[]): ((arr: T[]) => T[]) => {
                return (arr: T[]): T[] => {
                    if (arr.length <= 1) {
                        return arr;
                    }

                    let pivot: T = arr[0];
                    let left_arr: T[] = [];
                    let right_arr: T[] = [];

                    for (let i: number = 0; i < arr.length; i++) {
                        if (arr[i] < pivot) {
                            left_arr.push(arr[i]);
                        } else {
                            right_arr.push(arr[i]);
                        }
                    }

                    // @ts-ignore
                    return [...f(left_arr), ...f(right_arr)];
                };
            })((f: (h: typeof f) => (arr: T[]) => T[]): ((arr: T[]) => T[]) => {
                return (arr: T[]): T[] => {
                    if (arr.length <= 1) {
                        return arr;
                    }

                    let pivot: T = arr[0];
                    let left_arr: T[] = [];
                    let right_arr: T[] = [];

                    for (let i: number = 0; i < arr.length; i++) {
                        if (arr[i] < pivot) {
                            left_arr.push(arr[i]);
                        } else {
                            right_arr.push(arr[i]);
                        }
                    }

                    // @ts-ignore
                    return [...f(left_arr), ...f(right_arr)];
                };
            })(this.clone().unwrap()),
        );
    }

    rev(): Vec<T> {
        return new Vec([...this.arr].reverse());
    }

    len(): number {
        return this.arr.length;
    }

    map<N>(f: (x: T, i?: number) => N): Vec<N> {
        return new Vec([...this.arr].map(f));
    }

    filter(f: (x: T) => boolean): Vec<T> {
        return new Vec([...this.arr].filter(f));
    }

    reject(f: (x: T) => boolean): Vec<T> {
        return new Vec([...this.arr].filter((y: T): boolean => !f(y)));
    }

    head(): T {
        return this.arr[0];
    }

    last(): T {
        return this.arr[this.arr.length - 1];
    }

    empty(): boolean {
        return this.arr.length === 0;
    }

    uniq(): Vec<T> {
        return new Vec(Array.from(new Set([...this.arr])));
    }

    fold(f: (x: T, y: T) => T, z: T): T {
        let memo: typeof z = z;
        for (let i: number = 0; i < this.arr.length; i++) {
            memo = f(memo, this.arr[i]);
        }
        return memo;
    }

    foldl(f: (x: T, y: T) => T, z: T): T {
        let memo: typeof z = z;
        for (let i: number = 0; i < this.arr.length; i++) {
            memo = f(memo, this.arr[i]);
        }
        return memo;
    }

    foldr(f: (x: T, y: T) => T, z: T): T {
        let memo: typeof z = z;
        const xs: T[] = this.clone().rev().unwrap();
        for (let i: number = 0; i < this.arr.length; i++) {
            memo = f(memo, xs[i]);
        }
        return memo;
    }

    fold1(f: (x: T, y: T) => T): T {
        return this.clone().foldl(f, 1 as T);
    }

    foldl1(f: (x: T, y: T) => T): T {
        return this.clone().foldl(f, 1 as T);
    }

    foldr1(f: (x: T, y: T) => T): T {
        return this.clone().foldr(f, 1 as T);
    }

    fold0(f: (x: T, y: T) => T): T {
        return this.clone().foldl(f, 0 as T);
    }

    foldl0(f: (x: T, y: T) => T): T {
        return this.clone().foldl(f, 0 as T);
    }

    foldr0(f: (x: T, y: T) => T): T {
        return this.clone().foldr(f, 0 as T);
    }

    // @ts-ignore
    flat<N>(): Vec<N> {
        /*
        const flat_arr: (xs: any) => any = (xs: any): any => {
            const res = [];
            xs.forEach((el) => {
                if (Array.isArray(el)) {
                    // @ts-ignore
                    res.push(...flat_arr(el));
                } else if (el instanceof Vec) {
                    // @ts-ignore
                    res.push(...flat_arr(el.clone().unwrap()));
                } else {
                    // @ts-ignore
                    res.push(el);
                }
            });
            return res;
        };
        */
        // @ts-ignore
        return new Vec(
            // @ts-ignore
            ((f) => {
                return (xs) => {
                    const res = [];
                    xs.forEach((el) => {
                        if (Array.isArray(el)) {
                            // @ts-ignore
                            res.push(...f(el));
                        } else if (el instanceof Vec) {
                            // @ts-ignore
                            res.push(...f(el.clone().unwrap()));
                        } else {
                            // @ts-ignore
                            res.push(el);
                        }
                    });
                    return res;
                };
            })((f) => {
                return (xs) => {
                    const res = [];
                    xs.forEach((el) => {
                        if (Array.isArray(el)) {
                            // @ts-ignore
                            res.push(...f(el));
                        } else if (el instanceof Vec) {
                            // @ts-ignore
                            res.push(...f(el.clone().unwrap()));
                        } else {
                            // @ts-ignore
                            res.push(el);
                        }
                    });
                    return res;
                };
            })(this.clone().unwrap()),
        ) as Vec<N>;
        // return new Vec(flat_arr(this.clone().unwrap())) as Vec<N>;
    }

    any(f: (x: T) => boolean): boolean {
        for (let i: number = 0; i < this.arr.length; i++) {
            if (f(this.arr[i])) return true;
        }
        return false;
    }

    all(f: (x: T) => boolean): boolean {
        for (let i: number = 0; i < this.arr.length; i++) {
            if (!f(this.arr[i])) return false;
        }
        return true;
    }

    sum(): number {
        // @ts-ignore
        return this.clone().fold0((x: number, y: number): number => x + y);
    }

    product(): number {
        // @ts-ignore
        return this.clone().fold1((x: number, y: number): number => x * y);
    }

    avg(): number {
        // @ts-ignore
        return this.clone().fold0((x: number, y: number): number => x + y) / this.arr.length;
    }

    max(): T {
        let m: T = this.arr[0];
        for (let i: number = 0; i < this.arr.length; i++) {
            if (this.arr[i] > m) {
                m = this.arr[i];
            }
        }
        return m;
    }

    min(): T {
        let m: T = this.arr[0];
        for (let i: number = 0; i < this.arr.length; i++) {
            if (this.arr[i] < m) {
                m = this.arr[i];
            }
        }
        return m;
    }

    scan(f: (x: T, y: T) => T, z: T): Vec<T> {
        return new Vec([
            ...[z],
            ...((): T[] => {
                const arr: T[] = [];
                let memo: T = z;
                for (let i: number = 0; i < this.len(); i++) {
                    memo = f(memo, this.arr[i]);
                    arr.push(memo);
                }
                return arr;
            })(),
        ]);
    }

    scanl(f: (x: T, y: T) => T, z: T): Vec<T> {
        return this.clone().scan(f, z);
    }

    scanr(f: (x: T, y: T) => T, z: T): Vec<T> {
        return this.clone().rev().scanl(f, z);
    }

    scan1(f: (x: T, y: T) => T): Vec<T> {
        return this.clone().scan(f, 1 as T);
    }

    scanl1(f: (x: T, y: T) => T): Vec<T> {
        return this.clone().scanl(f, 1 as T);
    }

    scanr1(f: (x: T, y: T) => T): Vec<T> {
        return this.clone().scanr(f, 1 as T);
    }

    scan0(f: (x: T, y: T) => T): Vec<T> {
        return this.clone().scan(f, 0 as T);
    }

    scanl0(f: (x: T, y: T) => T): Vec<T> {
        return this.clone().scanl(f, 0 as T);
    }

    scanr0(f: (x: T, y: T) => T): Vec<T> {
        return this.clone().scanr(f, 0 as T);
    }

    slice(x: number, y?: number): Vec<T> {
        return y ? new Vec([...this.arr].slice(x, y)) : new Vec([...this.arr].slice(x));
    }

    take(n: number): Vec<T> {
        return new Vec(n <= 0 ? [...this.arr].slice(0, 0) : [...this.arr].slice(0, n));
    }

    drop(n: number): Vec<T> {
        return new Vec(n <= 0 ? [...this.arr] : [...this.arr].slice(n));
    }
}
