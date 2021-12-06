import { d4, d4_2 } from "./script";

test("d4 - FIN", async () => {
    const val = d4("test.txt");
    expect(val).toEqual(4512);
})

test("d4 - third first try ", async () => {
    const val = d4("input.txt");
    // console.log("d4 p1", val);
    expect(val).toEqual(2496);
})

test("d3 - Why so much text", async () => {
    const val = d4_2("test.txt");
    expect(val).toEqual(1924);
})

test("d3 - this puzzle is dumb", async () => {
    const val = d4_2("input.txt");
    // console.log("d4 p2", val);
    expect(val).toEqual(25925);
})
