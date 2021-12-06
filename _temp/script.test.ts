import { d, d_2 } from "./script";

test("d - test", async () => {
    const val = d("test.txt");
    expect(val).toEqual(undefined);
})

test("d ", async () => {
    const val = d("input.txt");
    console.log("d p1", val);
    expect(val).toEqual(4993);
})

test("d - test ", async () => {
    const val = d_2("test.txt");
    expect(val).toEqual(12);
})

test("d", async () => {
    const val = d_2("input.txt");
    console.log("d p2", val);
    expect(val).toEqual(undefined);
})
