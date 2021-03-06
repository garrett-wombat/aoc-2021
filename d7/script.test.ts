import { d, d_2 } from "./script";

test("d - test", async () => {
    const val = d("test.txt");
    expect(val).toEqual(37);
})

test("d ", async () => {
    const val = d("input.txt");
    // console.log("d p1", val);
    expect(val).toEqual(345197);
})

test("d - test ", async () => {
    const val = d_2("test.txt");
    expect(val).toEqual(168);
})

test("d", async () => {
    const val = d_2("input.txt");
    // console.log("d p2", val);
    expect(val).toEqual(96361606);
})
