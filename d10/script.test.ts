import { d, d_2 } from "./script";

test("d - test", async () => {
    const val = d("test.txt");
    expect(val).toEqual(26397);
})

test("d ", async () => {
    const val = d("input.txt");
    console.log("d p1", val);
    expect(val).toEqual(392421);
})

test("d - test ", async () => {
    const val = d_2("test.txt");
    expect(val).toEqual(288957);
})

test("d", async () => {
    const val = d_2("input.txt");
    console.log("d p2", val);
    expect(val).toEqual(undefined);
})
