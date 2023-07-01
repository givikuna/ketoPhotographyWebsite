export function isBlank(input: unknown): boolean {
    return !input || input == null || input == "" || input == undefined;
}

export function isJSON(obj: unknown): boolean {
    try {
        if (typeof obj === 'string') JSON.parse(obj);
        else return false;
        return true;
    } catch (e) {
        return false;
    }
}

export function jsonify(input: string): JSON | null {
    return isJSON(input) ? JSON.parse(input) : null;
}

export function supertrim(input: string): string {
    return input.replace(/\r?\n|\r/g, "").trim();
}

export function getFileExtension(file: string): string {
    return file.split('.').pop();
}
