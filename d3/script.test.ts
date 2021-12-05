import { d3, d3_2 } from "./script";

test("d3 - test - backward bits", async () => {
    const val = d3("test.txt");
    expect(val).toEqual(198);
})

test("d3 - flip it and reverse it", async () => {
    const val = d3("input.txt");
    console.log("d3 p1", val);
    expect(val).toEqual(693486);
})

test("d3 2 - test - Why so much text", async () => {
    const val = d3_2("test.txt");
    expect(val).toEqual(230);
})

test("d3 2 - ", async () => {
    const val = d3_2("input.txt");
    console.log("d3 p2", val);
    expect(val).toEqual(3379326);
})
