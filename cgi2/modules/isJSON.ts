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
