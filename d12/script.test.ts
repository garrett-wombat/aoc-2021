import { d, d_2 } from "./script";

test("d - test", async () => {
    const val = d("test.txt");
    expect(val).toEqual(10);
})
test("d - test2", async () => {
    const val = d("test2.txt");
    expect(val).toEqual(19);
})

test("d - test3", async () => {
    const val = d("test3.txt");
    expect(val).toEqual(226);
})

test("d ", async () => {
    const val = d("input.txt");
    expect(val).toEqual(3495);
})

test("d - test ", async () => {
    const val = d_2("test.txt");
    expect(val).toEqual(36);
})
test("d - test 2", async () => {
    const val = d_2("test2.txt");
    expect(val).toEqual(103);
})
test("d - test 3", async () => {
    const val = d_2("test3.txt");
    expect(val).toEqual(3509);
})

test("d", async () => {
    const val = d_2("input.txt");
    expect(val).toEqual(94849);
})
