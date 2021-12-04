import { d2 } from "./script";

test("d2 - test- whats that position", async () => {
    const val = d2("test.txt");
    expect(val).toEqual(150);
})

test("d2 - whats that position - real talk", async () => {
    const val = d2("input.txt");
    console.log("d2 p1", val);
    expect(val).toEqual(2147104);
})

test("d2 p2 - test- whats that position w/aim", async () => {
    const val = d2("test.txt", true);
    expect(val).toEqual(900);
})

test("d2 p2 - whats that position w/aim - real talk", async () => {
    const val = d2("input.txt", true);
    console.log("d2 p1", val);
    expect(val).toEqual(2044620088);
})
