import { d, d_2 } from "./script";

test("d6 - test", async () => {
    const val = d("test.txt");
    expect(val).toEqual(5934);
})

test("d6 ", async () => {
    const val = d("input.txt");
    console.log("d p1", val);
    expect(val).toEqual(380612);
})

test("d6 p2 - test ", async () => {
    const val = d_2("test.txt");
    expect(val).toEqual(26984457539);
})

test("d6 p2", async () => {
    const val = d_2("input.txt");
    console.log("d6 p2", val);
    expect(val).toEqual(1710166656900);
})
