import {isJsonataString, toJsonataString, fromJsonataString} from "../../src/asl-model/jsonata";

test("recognizes jsonata strings", () => {
    expect(isJsonataString("{% true %}")).toBeTruthy();
    expect(isJsonataString("{% 1 + 2 %}")).toBeTruthy();
})

test("recognizes non-jsonata strings", () => {
    expect(isJsonataString("{% true")).toBeFalsy();
    expect(isJsonataString("1 + 2 %}")).toBeFalsy();
    expect(isJsonataString("1 + 2")).toBeFalsy();
})

test("converts to jsonata strings", () => {
    expect(toJsonataString("1 + 2")).toBe("{% 1 + 2 %}")
    expect(toJsonataString("{% 5 + 6 %}")).toBe("{% 5 + 6 %}")
})

test("converts to regular strings", () => {
    expect(fromJsonataString("{% 1 + 2 %}")).toBe("1 + 2")
    expect(fromJsonataString("5 + 6")).toBe("5 + 6")
})