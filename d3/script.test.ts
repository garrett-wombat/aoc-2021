import { d4, d4_2 } from "./script";

test("d4 - test - backward bits", async () => {
    const val = d4("test.txt");
    expect(val).toEqual(198);
})

test("d4 - flip it and reverse it", async () => {
    const val = d4("input.txt");
    console.log("d4 p1", val);
    expect(val).toEqual(693486);
})

test("d4 2 - test - Why so much text", async () => {
    const val = d4_2("test.txt");
    expect(val).toEqual(230);
})

test("d4 2 - ", async () => {
    const val = d4_2("input.txt");
    console.log("d3 p2", val);
    expect(val).toEqual(3379326);
})
