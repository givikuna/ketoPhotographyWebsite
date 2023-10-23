export function to_vec<T>(x: T[] | string | Str | Vec<T>): Vec<T> {
    return new Vec(x);
}

export function to_char(x: string | Str) {
    return new Char(x);
}

export function to_int(x: number | string | Str | Float | Int) {
    return new Int(x);
}

export function to_float(x: string | Int | number | Str | Char): Float {
    return new Float(x);
}

export function to_str(x: string | number | Char | Int | Float | Str | Vec<any> | Array<any>): Str {
    return new Str(x);
}

export class Float {
    private val: number;

    constructor(val: string | Int | number | Str | Char) {
        this.val = ((given_value: typeof val): number => {
            if (given_value instanceof Str) {
                return parseFloat(given_value.unwrap());
            } else if (given_value instanceof Int) {
                return parseFloat(given_value.as_str().unwrap());
            } else if (typeof given_value === "string") {
                return parseFloat(given_value);
            } else if (typeof given_value === "number") {
                return parseFloat(given_value.toString());
            } else {
                return parseFloat(given_value.unwrap());
            }
        })(val);
        return this;
    }

    unwrap(): number {
        return Number(this.val);
    }

    equals(n: Float): boolean {
        return Math.round(n.unwrap()) === Math.round(this.val);
    }

    to_float(val: string | Int | number | Str | Char): Float {
        return new Float(val);
    }

    recip(): Float {
        return new Float(1 / this.val);
    }

    clone(): Float {
        return new Float(Number(this.val));
    }

    as_str(): Str {
        return new Str(this.val);
    }

    multiply_by(n: Float | number | Int): Float {
        const num: number = ((numer: typeof n): number => {
            if (numer instanceof Float) {
                return numer.unwrap();
            } else if (numer instanceof Int) {
                return numer.to_float().unwrap();
            } else {
                return numer;
            }
        })(n);
        return new Float(Number(this.val) * num);
    }

    divide_by(n: Float | number | Int): Float {
        const num: number = ((numer: typeof n): number => {
            if (numer instanceof Float) {
                return numer.unwrap();
            } else if (numer instanceof Int) {
                return numer.to_float().unwrap();
            } else {
                return numer;
            }
        })(n);
        return new Float(Number(this.val) / num);
    }

    add_to(n: Float | number | Int): Float {
        const num: number = ((numer: typeof n): number => {
            if (numer instanceof Float) {
                return numer.unwrap();
            } else if (numer instanceof Int) {
                return numer.to_float().unwrap();
            } else {
                return numer;
            }
        })(n);
        return new Float(Number(this.val) + num);
    }

    subtract(n: Float | number | Int): Float {
        const num: number = ((numer: typeof n): number => {
            if (numer instanceof Float) {
                return numer.unwrap();
            } else if (numer instanceof Int) {
                return numer.to_float().unwrap();
            } else {
                return numer;
            }
        })(n);
        return new Float(Number(this.val) - num);
    }

    subtract_from(n: Float | number | Int): Float {
        const num: number = ((numer: typeof n): number => {
            if (numer instanceof Float) {
                return numer.unwrap();
            } else if (numer instanceof Int) {
                return numer.to_float().unwrap();
            } else {
                return numer;
            }
        })(n);
        return new Float(num - Number(this.val));
    }

    as_int(): Int {
        return new Int(this.val);
    }

    abs(): Float {
        return new Float(Math.abs(this.val));
    }

    ceil(): Float {
        return new Float(Math.ceil(this.val));
    }

    floor(): Float {
        return new Float(Math.floor(this.val));
    }

    cbrt(): Float {
        return new Float(Math.cbrt(this.val));
    }

    sqrt(): Float {
        return new Float(Math.sqrt(this.val));
    }

    log10(): Float {
        return new Float(Math.log10(this.val));
    }

    copy(): Float {
        return this.clone();
    }

    loge(): Float {
        return new Float(Math.log(this.val));
    }

    log1p(): Float {
        return new Float(Math.log1p(this.val));
    }

    log2(): Float {
        return new Float(Math.log2(this.val));
    }

    log(base: Int | Float | number): Float {
        const true_base: number = ((b: typeof base): number => {
            if (b instanceof Int) {
                return b.unwrap();
            } else if (b instanceof Float) {
                return b.unwrap();
            } else {
                return b;
            }
        })(base);
        return new Float(Math.log(true_base) / Math.log(this.val));
    }

    to_deg(): Float {
        return new Float((this.val * 180.0) / Math.PI);
    }

    to_rad(): Float {
        return new Float((this.val * Math.PI) / 180.0);
    }

    E(ex: Int | Float | number): Float {
        return new Float(
            this.val * Math.pow(10, ex instanceof Float || ex instanceof Int ? ex.unwrap() : ex),
        );
    }

    pow(x: number | Float | Int): Float {
        return new Float(Math.pow(this.unwrap(), x instanceof Float || x instanceof Int ? x.unwrap() : x));
    }

    digits(): Vec<Char> {
        return this.as_str()
            .chars()
            .map((s: string): Char => new Char(s));
    }
}

export class Char {
    private val: string;

    constructor(val: string | Str) {
        const value: string = val instanceof Str ? val.clone().unwrap() : String(val);
        this.val = value.charAt(0);
        return this;
    }

    to_char(s: string | Str): Char {
        return new Char(s);
    }

    equals(c: Char): boolean {
        return c.unwrap() === this.val;
    }

    unwrap(): string {
        return String(this.val);
    }

    clone(): Char {
        return new Char(String(this.val).charAt(0));
    }

    as_int(): Int {
        return new Int(this.val);
    }

    as_float(): Float {
        return new Float(this.val);
    }

    as_str(): Str {
        return new Str(String(this.val));
    }

    copy(): Char {
        return this.clone();
    }

    is_numeric(): boolean {
        return new Array(10)
            .fill(0)
            .map((x: number, i: number): number => x + i)
            .map(String)
            .includes(this.unwrap());
    }
}

export class Str {
    private val: string;

    constructor(val: string | number | Char | Int | Float | Str | Vec<any> | Array<any>) {
        this.val = ((value: typeof val): string => {
            if (value instanceof Char) {
                return value.unwrap();
            } else if (value instanceof Str) {
                return value.unwrap();
            } else if (value instanceof Int) {
                return value.as_str().unwrap();
            } else if (value instanceof Float) {
                return value.as_str().unwrap();
            } else if (typeof value === "string") {
                return value;
            } else if (typeof value === "number") {
                return value.toString();
            } else if (value instanceof Vec) {
                return value.to_string();
            } else {
                return JSON.stringify(value, null, 4);
            }
        })(val);
        return this;
    }

    starts_with(s: string | Str | Char): boolean {
        return this.clone()
            .unwrap()
            .startsWith(s instanceof Char || s instanceof Str ? s.unwrap() : s);
    }

    to_str(s: string | number | Char | Int | Float | Str | Vec<any> | Array<any>): Str {
        return new Str(s);
    }

    as_char(): Char {
        return new Char(this.val);
    }

    equals(s: Str): boolean {
        return s.unwrap() === this.val;
    }

    unwrap(): string {
        return String(this.val);
    }

    remove_all(s: Str | Char | string | number | Float | Int): Str {
        const r: string = ((d: typeof s): string => {
            if (d instanceof Str) {
                return d.unwrap();
            } else if (d instanceof Char) {
                return d.unwrap();
            } else if (d instanceof Float) {
                return d.as_str().unwrap();
            } else if (d instanceof Int) {
                return d.as_str().unwrap();
            } else if (typeof d === "number") {
                return d.toString();
            } else {
                return d;
            }
        })(s);
        return this.chars()
            .reject((x: string): boolean => x === r)
            .join("");
    }

    clone(): Str {
        return new Str(String(this.val));
    }

    palindrome(): boolean {
        return this.val === this.val.toString().split("").reverse().join("");
    }

    size(): Int {
        return new Int(this.val.length);
    }

    numeric(): boolean {
        return /^[-+]?\d+(\.\d+)?$/.test(this.val);
    }

    as_int(): Int {
        return new Int(parseInt(this.val));
    }

    as_float(): number {
        return parseFloat(this.val);
    }

    chars(): Vec<string> {
        return new Vec(String(this.val).split(""));
    }

    join<T>(xs: T[] | Vec<T>): Str {
        return new Str((xs instanceof Vec ? xs.clone().unwrap() : xs).join(String(this.val)));
    }

    len(): Int {
        return new Int(String(this.val).length);
    }

    trim_start(): Str {
        return new Str(String(this.val).trimStart());
    }

    trim_end(): Str {
        return new Str(String(this.val).trimStart());
    }

    trim(): Str {
        return new Str(String(this.val).trim());
    }

    capitalize(): Str {
        return new Str(String(this.val).charAt(0).toUpperCase() + String(this.val).slice(1));
    }

    to_upper(): Str {
        return new Str(String(this.val).toUpperCase());
    }

    to_lower(): Str {
        return new Str(String(this.val).toLowerCase());
    }

    to_number(): number {
        return Number(String(this.val));
    }

    take(n: number | Int): Str {
        return new Str(
            String(this.val)
                .split("")
                .slice(0, n instanceof Int ? n.unwrap() : n)
                .join(""),
        );
    }

    drop(n: number | Int): Str {
        return new Str(
            String(this.val)
                .split("")
                .slice(n instanceof Int ? n.unwrap() : n)
                .join(""),
        );
    }

    rev(): Str {
        return new Str(String(this.val).split("").reverse().join(""));
    }

    concat(s: Str | string) {
        return new Str(String(String(this.val) + (s instanceof Str ? s.clone().unwrap() : s)));
    }

    at(i: Int | number): string | undefined {
        return String(this.val).at(i instanceof Int ? i.unwrap() : i);
    }

    char_at(i: Int | number): string {
        return String(this.val).charAt(i instanceof Int ? i.unwrap() : i);
    }

    ends_with(s: string | Str): boolean {
        return String(this.val).endsWith(s instanceof Str ? s.unwrap() : s);
    }

    includes(s: string | Str): boolean {
        return String(this.val).includes(s instanceof Str ? s.unwrap() : s);
    }

    replace(s: string, s2: string): Str {
        return new Str(String(this.val).replace(s, s2));
    }

    repeat(n: number | Int): Str {
        let new_str: string = "";
        new Array(Math.floor(n instanceof Int ? n.unwrap() : n)).forEach((): void => {
            new_str += String(this.val);
        });
        return new Str(new_str);
    }

    fold(f: (x: Char, y: Char) => Char, z: Char): Str {
        return new Str(
            (new Vec(this.val) as Vec<string>).mapcar((c: string): Char => new Char(c)).fold(f, z),
        );
    }

    foldr(f: (x: Char, y: Char) => Char, z: Char): Str {
        return new Str(
            (new Vec(this.val) as Vec<string>).mapcar((c: string): Char => new Char(c)).foldr(f, z),
        );
    }

    folds(f: (x: Char, y: Char) => Char): Str {
        return new Str(
            (new Vec(this.val) as Vec<string>).mapcar((c: string): Char => new Char(c)).fold(f, new Char("")),
        );
    }

    foldrs(f: (x: Char, y: Char) => Char): Str {
        return new Str(
            (new Vec(this.val) as Vec<string>)
                .mapcar((c: string): Char => new Char(c))
                .foldr(f, new Char("")),
        );
    }

    empty(): boolean {
        return this.val.length === 0;
    }

    clear(): Str {
        this.val === "";
        return this;
    }

    copy(): Str {
        return this.clone();
    }

    words(): string[] {
        return this.val.toString().split("");
    }

    split(s: Str | string | Char): Vec<Str> {
        return new Vec(
            Array.from(this.val.toString().split(s instanceof Str || s instanceof Char ? s.unwrap() : s)).map(
                (x: string): Str => new Str(x),
            ),
        );
    }

    uniq(): Str {
        return new Str(new Array(new Set(this.chars().unwrap())));
    }

    sort(): Str {
        return new Str(this.chars().unwrap().sort().join(""));
    }

    slice(x: Int | number, y: Int | number): Str {
        return new Str(
            this.chars()
                .unwrap()
                .slice(x instanceof Int ? x.unwrap() : x, y instanceof Int ? y.unwrap() : y),
        );
    }
}

export class Int {
    private val: number;

    constructor(val: number | string | Str | Float | Int) {
        this.val = Math.floor(
            ((value: typeof val): number => {
                if (value instanceof Str) {
                    return parseInt(value.unwrap());
                } else if (value instanceof Float) {
                    return parseInt(value.as_str().unwrap());
                } else if (value instanceof Int) {
                    return parseInt(value.as_str().unwrap());
                } else if (typeof value === "string") {
                    return parseInt(value);
                } else {
                    return value;
                }
            })(val),
        );
        return this;
    }

    to_int(n: number | string | Str | Float | Int): Int {
        return new Int(n);
    }

    unwrap() {
        return Number(this.val);
    }

    equals(n: Int): boolean {
        return n.unwrap() === this.val;
    }

    floor(): Int {
        return new Int(Math.floor(Number(this.val)));
    }

    ceil(): Int {
        return new Int(Math.ceil(Number(this.val)));
    }

    abs(): Int {
        return new Int(Math.abs(Number(this.val)));
    }

    clone(): Int {
        return new Int(Number(this.val));
    }

    as_str(): Str {
        return new Str(Number(this.val).toString());
    }

    to_float(): Float {
        return new Float(Number(Math.floor(this.val)));
    }

    is_even(): boolean {
        return Number(this.val) % 2 === 0;
    }

    is_odd(): boolean {
        return Number(this.val) % 2 === 1;
    }

    divisors(): Vec<Int> {
        return new Vec(new Array(this.as_str().len()))
            .fill(0)
            .mapcar((el: number, i: number | undefined): number => el + (i as number))
            .map((x: number): Int => new Int(x));
    }

    is_prefect(): boolean {
        return this.divisors().sum().as_int().unwrap() === this.val;
    }

    multiply_by(n: Int | number): Int {
        return new Int(
            n instanceof Int ? Number(n.unwrap()) * Number(this.val) : Number(n) * Number(this.val),
        );
    }

    divide_by(n: Int | number): Int {
        return new Int(
            n instanceof Int ? Number(this.val) / Number(n.unwrap()) : Number(this.val) / Number(n),
        );
    }

    add_to(n: Int | number): Int {
        return new Int(
            n instanceof Int ? Number(n.unwrap()) + Number(this.val) : Number(n) * Number(this.val),
        );
    }

    subtract(n: Int | number): Int {
        return new Int(
            n instanceof Int ? Number(this.val) - Number(n.unwrap()) : Number(this.val) - Number(n),
        );
    }

    recip(): Int {
        return new Int(1 / Number(this.val));
    }

    sqrt(): Int {
        return new Int(Math.sqrt(Number(this.val)));
    }

    expt(n: number | Int): Int {
        return new Int(Math.pow(Number(this.val), n instanceof Int ? n.unwrap() : n));
    }

    inc(): Int {
        return new Int(Number(this.val) + 1);
    }

    dec(): Int {
        return new Int(Number(this.val) + 1);
    }

    increment(): Int {
        this.val += 1;
        return this;
    }

    decrement(): Int {
        this.val += 1;
        return this;
    }

    factorial(): Int {
        return new Int([0, 1].includes(this.val) ? 1 : new Int(this.val).multiply_by(this.val - 1).unwrap());
    }

    cbrt(): Int {
        return new Int(Math.cbrt(this.val));
    }

    log10(): Int {
        return new Int(Math.log10(this.val));
    }

    loge(): Int {
        return new Int(Math.log(this.val));
    }

    log1p(): Int {
        return new Int(Math.log1p(this.val));
    }

    log2(): Int {
        return new Int(Math.log2(this.val));
    }

    log(base: Int | Float | number): Int {
        const true_base: number = ((b: typeof base): number => {
            if (b instanceof Int) {
                return b.unwrap();
            } else if (b instanceof Float) {
                return b.unwrap();
            } else {
                return b;
            }
        })(base);
        return new Int(Math.log(true_base) / Math.log(this.val));
    }

    to_deg(): Int {
        return new Int((this.val * 180) / Math.PI);
    }

    copy(): Int {
        return this.clone();
    }

    to_rad(): Int {
        return new Int((this.val * Math.PI) / 180);
    }

    E(ex: Int | Float | number): Int {
        return new Int(this.val * Math.pow(10, ex instanceof Float || ex instanceof Int ? ex.unwrap() : ex));
    }
}

export class Vec<T> {
    private arr: Array<T>;

    constructor(arr: T[] | string | Str | Vec<T>) {
        this.arr = ((val: typeof arr): T[] => {
            if (val instanceof Str) {
                return Array.from(val.chars().unwrap()) as T[];
            } else if (typeof val === "string") {
                return Array.from(val.split("")) as T[];
            } else if (val instanceof Vec) {
                return Array.from(val.clone().unwrap());
            } else {
                return Array.from(val);
            }
        })(arr);
        return this;
    }

    equals(xs: Vec<T>): boolean {
        return xs.enumerate().all((x: [number, T]): boolean => x[1] === this.arr[x[0]]);
    }

    to_vec(s: T[] | string | Str): Vec<T> {
        return new Vec(s);
    }

    unwrap(): Array<T> {
        return Array.from(this.arr);
    }

    unwords(): Str {
        return this.join(" ");
    }

    len(): Int {
        return new Int(this.arr.length);
    }

    at(i: number | Int): T {
        const n: number = i instanceof Int ? i.unwrap() : i;
        return n < 0 ? this.arr[this.arr.length + n] : this.arr[n];
    }

    freq(val: T): Int {
        return new Int(Array.from(this.arr).filter((el: T): boolean => el === val).length);
    }

    enumerate(): Vec<[number, T]> {
        return new Vec(Array.from(this.arr.entries()));
    }

    sort(): Vec<T> {
        return new Vec(
            Array.from(this.arr).sort((x: T, y: T): number => {
                if (x > y) {
                    return 1;
                } else if (x < y) {
                    return -1;
                } else {
                    return 0;
                }
            }),
        );
    }

    mapcar<M>(f: (x: T, i?: number) => M): Vec<M> {
        return new Vec(Array.from(this.arr).map(f));
    }

    flat<N>(): Vec<N> {
        return new Vec(this.arr.flat(Infinity)) as Vec<N>;
    }

    join(s: string | Str | Char): Str {
        return new Str(Array.from(this.arr).join(s instanceof Str || s instanceof Char ? s.unwrap() : s));
    }

    pop(): T | undefined {
        return this.arr.pop();
    }

    uniq(): Vec<T> {
        return new Vec(Array.from(new Set(this.arr)));
    }

    fold(f: (z: T, x: T) => T, z: T): T {
        let memo: T = z;
        Array.from(this.arr).forEach((x: T): void => {
            memo = f(memo, x);
        });
        return memo;
    }

    fold1(f: (z: number, x: number) => number): number {
        let memo: number = 1;
        (Array.from(this.arr) as number[]).forEach((x: number): void => {
            memo = f(memo, x);
        });
        return memo;
    }

    foldl(f: (z: T, x: T) => T, z: T): T {
        return new Vec(Array.from(this.arr)).fold(f, z);
    }

    foldr(f: (z: T, x: T) => T, z: T): T {
        let memo: T = z;
        Array.from(this.arr)
            .reverse()
            .forEach((x: T): void => {
                memo = f(memo, x);
            });
        return memo;
    }

    foldr1(f: (z: number, x: number) => number): number {
        let memo: number = 1;
        (Array.from(this.arr).reverse() as number[]).forEach((x: number): void => {
            memo = f(memo, x);
        });
        return memo;
    }

    foldr0(f: (z: number, x: number) => number): number {
        let memo: number = 0;
        (Array.from(this.arr).reverse() as number[]).forEach((x: number): void => {
            memo = f(memo, x);
        });
        return memo;
    }

    foldl0(f: (z: number, x: number) => number): number {
        let memo: number = 0;
        (Array.from(this.arr) as number[]).forEach((x: number): void => {
            memo = f(memo, x);
        });
        return memo;
    }

    foldl1(f: (z: number, x: number) => number): number {
        let memo: number = 1;
        (Array.from(this.arr) as number[]).forEach((x: number): void => {
            memo = f(memo, x);
        });
        return memo;
    }

    fold0(f: (z: number, x: number) => number): number {
        let memo: number = 1;
        (Array.from(this.arr) as number[]).forEach((x: number): void => {
            memo = f(memo, x);
        });
        return memo;
    }

    rev(): Vec<T> {
        return new Vec(Array.from(this.arr).reverse());
    }

    clone(): Vec<T> {
        return new Vec(Array.from(this.arr));
    }

    extend<N>(vec: Vec<N> | N[]) {
        return vec instanceof Vec ? new Vec([...this.arr, ...vec.unwrap()]) : new Vec([...this.arr, ...vec]);
    }

    any(f: (x: T) => boolean): boolean {
        const xs: T[] = Array.from(this.arr);

        for (let i: number = 0; i < xs.length; i++) {
            if (f(xs[i])) {
                return true;
            }
        }

        return false;
    }

    all(f: (x: T) => boolean): boolean {
        const xs: T[] = Array.from(this.arr);

        for (let i: number = 0; i < xs.length; i++) {
            if (!f(xs[i])) {
                return false;
            }
        }

        return true;
    }

    sum(): Float {
        return new Float(new Vec(Array.from(this.arr)).fold0((x: number, y: number): number => x + y));
    }

    product(): number {
        return new Vec(Array.from(this.arr)).fold1((x: number, y: number): number => x * y);
    }

    mean(): number {
        return new Vec(Array.from(this.arr)).sum().unwrap() / Array.from(this.arr).length;
    }

    min(): T {
        const xs: T[] = Array.from(this.arr);
        let minimum: T = xs[0];

        for (let i: number = 0; i < xs.length; i++) {
            if (xs[i] < minimum) {
                minimum = xs[i];
            }
        }

        return minimum;
    }

    max(): T {
        const xs: T[] = Array.from(this.arr);
        let maximum: T = xs[0];

        for (let i: number = 0; i < xs.length; i++) {
            if (xs[i] > maximum) {
                maximum = xs[i];
            }
        }

        return maximum;
    }

    to_string(): string {
        return JSON.stringify(this.arr, null, 4);
    }

    push(el: T): Vec<T> {
        this.arr.push(el);
        return new Vec(Array.from(this.arr));
    }

    map<N>(f: (x: T, i?: number) => N): Vec<N> {
        return new Vec(Array.from(this.arr).map(f));
    }

    keys(): Vec<number> {
        return new Vec(
            new Vec(Array.from(this.arr))
                .enumerate()
                .map((x: [number, T]): number => x[0])
                .unwrap(),
        );
    }

    clear(): Vec<any> {
        this.arr = [];
        return this;
    }

    fill<N>(val: N): Vec<N> {
        return new Vec(new Array(this.arr.length).fill(val));
    }

    empty(): boolean {
        return this.arr.length <= 0;
    }

    iter(): Iterable<[number, T]> {
        return Array.from(this.arr).entries();
    }

    filter(f: (x: T) => boolean): Vec<T> {
        return new Vec(Array.from(this.arr).filter(f));
    }

    reject(f: (x: T) => boolean): Vec<T> {
        return new Vec(Array.from(this.arr).filter((y: T): boolean => !f(y)));
    }

    partition(f: (x: T) => boolean): Vec<Vec<T>> {
        return new Vec([...Array.from(this.arr).filter(f), ...new Vec(Array.from(this.arr)).unwrap()]).mapcar(
            (el): Vec<T> => new Vec(el as T[]),
        );
    }

    last_index_of(x: T): Int {
        return new Int(this.arr.lastIndexOf(x));
    }

    values(): Iterable<T> {
        return this.arr.values();
    }

    splice(x: Int | number, y?: Int | number, z?: T): Vec<T> {
        if (y) {
            this.arr.splice(x instanceof Int ? x.unwrap() : x, y instanceof Int ? y.unwrap() : y);
        } else if (z) {
            if (y) {
                this.arr.splice(
                    x instanceof Int ? x.unwrap() : x,
                    // @ts-ignore
                    y instanceof Int ? y.unwrap() : y,
                    z,
                );
            }
        } else {
            this.arr.splice(x instanceof Int ? x.unwrap() : x);
        }
        return this;
    }

    is_char_vec(): boolean {
        return this.clone().all((x: unknown): boolean => x instanceof Char);
    }

    is_str_vec(): boolean {
        return this.clone().all((x: unknown): boolean => x instanceof Str);
    }

    is_int_vec(): boolean {
        return this.clone().all((x: unknown): boolean => x instanceof Int);
    }

    is_float_vec(): boolean {
        return this.clone().all((x: unknown): boolean => x instanceof Int);
    }

    is_number_vec(): boolean {
        return this.clone().all((x: unknown): boolean => typeof x === "number");
    }

    is_string_vec(): boolean {
        return this.clone().all((x: unknown): boolean => typeof x === "string");
    }

    remove_index(i: Int | number): Vec<T> {
        const index: number = i instanceof Int ? i.unwrap() : i;
        this.arr.splice(index, 1);
        return this;
    }

    find_index(x: T): Int | undefined {
        return new Int(this.arr.findIndex((el: T): boolean => el === x));
    }

    find(f: (x: T) => boolean): T | undefined {
        return this.arr.find(f);
    }

    compact(): Vec<T> {
        const new_arr: T[] = [];
        for (let i: number = 0; i < this.arr.length; i++) {
            if (this.arr[i]) {
                new_arr.push(this.arr[i]);
            }
        }
        return new Vec(new_arr);
    }

    remove(el: T): Vec<T> {
        if (this.find((x: T): boolean => el === x)) {
            this.arr.splice(this.find((x: T): boolean => el === x) as number, 1);
        }
        return this;
    }

    to_str(): Str {
        return new Str(this.to_string());
    }

    head(): T {
        return this.arr[0];
    }

    last(): T {
        return this.arr[this.clone().len().dec().unwrap()];
    }

    slice(x: Int | number, y: Int | number): Vec<T> {
        return new Vec(
            this.clone()
                .unwrap()
                .slice(x instanceof Int ? x.unwrap() : x, y instanceof Int ? y.unwrap() : y),
        );
    }

    take(n: Int | number): Vec<T> {
        if ((n instanceof Int ? n.unwrap() : n) <= 0) {
            return this.clone().slice(0, 0);
        } else {
            return this.clone().slice(0, n instanceof Int ? n.unwrap() : n);
        }
    }

    drop(n: Int | number): Vec<T> {
        if ((n instanceof Int ? n.unwrap() : n) <= 0) {
            return this.clone();
        } else {
            return new Vec(
                this.clone()
                    .unwrap()
                    .slice(n instanceof Int ? n.unwrap() : n),
            );
        }
    }

    split_at(n: Int | number): Vec<T> {
        const i: number = n instanceof Int ? n.unwrap() : n;
        return new Vec([...this.clone().take(i).unwrap(), ...this.clone().drop(i).unwrap()]);
    }

    get(i: Int | number): T {
        return this.arr[i instanceof Int ? i.unwrap() : i];
    }

    elem_indices(el: T): Vec<Int> {
        const res: Vec<Int> = new Vec([]);
        for (let i: number = 0; i < this.len().unwrap(); i++) {
            if (this.get(i) === el) {
                res.push(new Int(i));
            }
        }
        return res;
    }

    indices(): Vec<Int> {
        return this.clone()
            .enumerate()
            .mapcar((x: [number, T]): Int => new Int(x[0]));
    }

    map_to_int(): Vec<Int> {
        return this.clone().mapcar((x: T): Int => new Int(x as number));
    }

    map_to_float(): Vec<Float> {
        return this.clone().mapcar((x: T): Float => new Float(x as number));
    }

    map_to_str(): Vec<Str> {
        return this.clone().mapcar((x: T): Str => new Str(x as number));
    }

    map_to_string(): Vec<string> {
        return this.clone().mapcar(String);
    }

    map_to_number(): Vec<number> {
        return this.clone().map(Number);
    }

    copy(): Vec<T> {
        return this.clone();
    }

    map_to_char(): Vec<Char> {
        return this.clone().map((x: T): Char => new Char(x as string));
    }

    member(x: T): boolean {
        return this.clone().unwrap().includes(x);
    }

    mem(x: T): boolean {
        return this.arr.includes(x);
    }

    includes(x: T): boolean {
        return this.clone().unwrap().includes(x);
    }
}
