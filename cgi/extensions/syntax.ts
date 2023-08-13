export function isBlank(input: Readonly<unknown>): boolean {
    return !input || input == null || input == "" || input == undefined;
}

export function isJSON(obj: Readonly<string>): boolean {
    try {
        if (typeof obj !== "string") return false;
        const ans: unknown | JSON = JSON.parse(obj);
        if (["", [], {}, null, undefined].includes(ans) || typeof ans === "undefined" || Array.isArray(ans)) {
            return true;
        }
        return false;
    } catch (e: unknown) {
        return false;
    }
}

export function supertrim(input: Readonly<string>): string {
    return input.replace(/\r?\n|\r/g, "").trim();
}

export function getFileExtension(file: Readonly<string>): string | undefined {
    if (file == undefined || file == null) return undefined;
    return file.split(".").length > 1 ? file.split(".").pop() : undefined;
}

export function isNumeric(givenString: Readonly<string>): boolean {
    if (typeof givenString !== "string") return false;
    return /^-?\d+$/.test(givenString);
}
