import { d5, d5_2 } from "./script";

test("d5 - test", async () => {
    const val = d5("test.txt");
    expect(val).toEqual(5);
})

test("d5 ", async () => {
    const val = d5("input.txt");
    // console.log("d5 p1", val);
    expect(val).toEqual(4993);
})

test("d5 - test - diagonal", async () => {
    const val = d5_2("test.txt");
    expect(val).toEqual(12);
})

test("d5", async () => {
    const val = d5_2("input.txt");
    // console.log("d5 p2", val);
    expect(val).toEqual(21101);
})
