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

export function supertrim(input: string): string {
    return input.replace(/\r?\n|\r/g, "").trim();
}

export function getFileExtension(file: string): string | undefined {
    return file.split('.').length > 1 ? file.split('.').pop() : undefined;
}

export function isNumeric(givenString: string): boolean {
    if (typeof givenString !== 'string') return false;
    return /^-?\d+$/.test(givenString)
}
