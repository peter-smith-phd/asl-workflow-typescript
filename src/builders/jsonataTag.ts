export function jsonataTag(jsonataString: TemplateStringsArray): string {
    return `{% ${jsonataString[0]} %}`;
}