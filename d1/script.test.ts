import { d1 } from "./script";

test("d1 - window size 1", async () => {
    const val = d1("test.txt", 1);
    expect(val).toEqual(7);
})

test("d1 - window size 1 - guess", async () => {
    const test = d1("input.txt", 1);
    console.log("d1 p1", test);
    expect(test).toEqual(1548);
})

test("d1 - window size 3", async () => {
    const val = d1("test.txt", 3);
    expect(val).toEqual(5);
})

test("d1 - window size 3 - guess", async () => {
    const test = d1("input.txt", 3);
    console.log("d1 p2", test);
    expect(test).toEqual(1589)
})
