import {  d_1, d_2, characterBitMaps, decodeNumbers, not, decodeValidation,reduceSymbolToBit } from "./script";


test("d - test", async () => {
    const val = d_1("test.txt");
    expect(val).toEqual(26);
})

test("d ", async () => {
    const val = d_1("input.txt");
    // console.log("d p1", val);
    expect(val).toEqual(245);
})

test("not check", async () => {
    expect(not(3).toString(2)).toEqual("1111100")
})

const { a,b,c,d,e,f,g}=characterBitMaps;
const defaultCodes = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"];
const manualDecode = [a|b|c|e|f|g, c|f,  a|c|d|e|g, a|c|d|f|g, b|c|d|f, a|b|d|f|g,  a|b|d|e|f|g, a|c|f,  a|b|c|d|e|f|g, a|b|c|d|f|g]

test("mapping check", async () => {
    const manualDecade = [a|b|c|e|f|g, c|f,  a|c|d|e|g, a|c|d|f|g, b|c|d|f, a|b|d|f|g,  a|b|d|e|f|g, a|c|f,  a|b|c|d|e|f|g, a|b|c|d|f|g]
    const codesToBits = defaultCodes.reduce(reduceSymbolToBit(["a","b","c","d","e","f","g"]), {numbers: [], symbols:[]})
    expect(codesToBits.numbers).toEqual(manualDecade);
})

test("decode check", async () => {
    let cypher = Array(7).fill(null);
    expect(decodeValidation(manualDecode, cypher)).toEqual(true);
})

test("decode this", async () => {
    let mapp = Array(7).fill(null);
    const shouldBeTrue =  decodeNumbers(0, mapp, defaultCodes)
    expect(shouldBeTrue).toEqual(true); 
})

test("recursive check", async () => {
    let cypher =  Array(7).fill(null);
    // b=> c
    const scrable = ["abcefg", "bf", "abdeg", "abdfg", "bcdf", "acdfg", "acdefg", "abf", "abcdefg", "abcdfg"];
    const shouldBeTrue =  decodeNumbers(0, cypher, scrable)
    expect(shouldBeTrue).toEqual(true); 
})

test("d - all the single ladies ", async () => {
    const val = d_2("debug1.txt");
    expect(val).toEqual(5353);
})

test("d - test ", async () => {
    const val = d_2("test.txt");
    expect(val).toEqual(61229);
})

test("d", async () => {
    const val = d_2("input.txt");
    // console.log("d p2", val);
    expect(val).toEqual(983026);
})
