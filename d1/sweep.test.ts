import { computeIncreasingGround } from "./sweep";

test("d1 - window size 1", async () => {
    const val = computeIncreasingGround("test.txt", 1);
    expect(val).toEqual(7);
})

test("d1 - window size 1 - guess", async () => {
    const test = computeIncreasingGround("input.txt", 1);
    expect(typeof test).toEqual("number")
    console.log("part1", test)
})

test("d1 - window size 3", async () => {
    const val = computeIncreasingGround("test.txt", 3);
    expect(val).toEqual(5);
})

test("d1 - window size 3 - guess", async () => {
    const test = computeIncreasingGround("input.txt", 3);
    expect(typeof test).toEqual("number")
    console.log("part2", test)
})
