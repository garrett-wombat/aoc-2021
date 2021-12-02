import { upDownForward } from "./updown";

test("d2 - whats that position", async () => {
    const val = upDownForward("test.txt");
    expect(val).toEqual(150);
})

test("d2 - whats that position - real talk", async () => {
    const val = upDownForward("input.txt");
    console.log("d2 p1", val);
    expect(val).toEqual(2147104);
})

test("d2 - whats that position w/aim", async () => {
    const val = upDownForward("test.txt", true);
    expect(val).toEqual(900);
})

test("d2 - whats that position w/aim - real talk", async () => {
    const val = upDownForward("input.txt", true);
    console.log("d2 p1", val);
    expect(val).toEqual(2044620088);
})
