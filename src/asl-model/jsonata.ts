/**
 * Returns true if the expression looks like valid JSONata (surrounded by {% and %}), else false.
 */
export function isJsonataString(jsonata: string): boolean {
    return (jsonata.startsWith("{%") && jsonata.endsWith("%}") && jsonata.length >= 4);
}

/**
 * Given a raw string, encapsulate it using {% and %} to make it a JSONata string. If the string is already
 * JSONata, just return it without modification.
 */
export function toJsonataString(input: string): string {
    if (!isJsonataString(input)) {
        return `{% ${input} %}`;
    }
    return input;
}

/**
 * Given a JSONata string (surrounded by {% and %}), return the raw string between those braces. If the string
 * is already a regular string, return it unmodified.
 */
export function fromJsonataString(input: string): string {
    if (isJsonataString(input)) {
        return input.slice(2, -2).trim();
    } else {
        return input;
    }
}
