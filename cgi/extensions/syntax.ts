export const isBlank: Function = (input: unknown): boolean => !input || input == null || input == "" || input == undefined;

export const isJSON: Function = (obj: unknown): boolean => {
    try {
        if (typeof obj === 'string') JSON.parse(obj);
        else return false;
        return true;
    } catch (e) {
        return false;
    }
}

export const stringify: Function = (obj: any): string => String(obj);

export const jsonify: Function = (input: string): JSON | null => isJSON(input) ? JSON.parse(input) : null;

export const supertrim: Function = (input: string): string => {
    input = input.replace(/\r?\n|\r/g, "");
    input = input.trim();
    return input;
}

export const len: Function = <T>(arr: Array<T> | string): number => arr.length;