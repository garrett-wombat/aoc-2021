// imports
import fs from "fs";
import { join } from "path";

type CSymbols = "a"|"b"|"c"|"d"|"e"|"f"|"g";

const isNum = [
    ()=> false, // 0
    (str:string)=> str.length === 2, // 1
    ()=> false, // 2
    ()=> false, // 3
    (str:string)=> str.length === 4, // 4
    ()=> false, // 5
    ()=> false, // 6
    (str:string)=> str.length === 3, // 7
    (str:string)=> str.length === 7, // 8
    ()=> false, // 9
]


export const d_1 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");

    let numberCount = 0

    lines.forEach(line => {
        const [ numbersLine, segmentsLine ] = line.split(" | ");  
        let numbers = segmentsLine.split(" ");
        // console.log(numbers)
        numbers.forEach(number => {
            if(isNum[1](number) || isNum[4](number) || isNum[7](number) || isNum[8](number)){
                numberCount++
            }
        })
        
    })
  return numberCount  
};

// 1 7 4 2 3 5 0 6 9 8  <-- symbols
// 2 3 4 5 5 5 6 6 6 7  <-- lengths
// . . . x x x x x x .  <-- decode by deduction

// 1 7 4 2 3 5 0 6 9 8  <-- symbols
// 2 3 4 . . . . . . 7  <-- decode by length

// . a . a a a a a a a  <-- standard
// . . b . . b b b b b
// c c c c c . c . c c
// . . d d d d . d d d
// . . . e . . e e . e
// f f f . f f f f f f
// . . . g g g g g g g

// 1 7 4 2 3 5 0 6 9 8  <-- !symbols
// 2 3 4 5 5 5 6 6 6 7  <-- lengths
// a . a . . . . . . .  <-- inverted
// b b . b b . . . . .
// . . . . . c . c . .
// d d . . . . d . . .
// e e e . e e . . e .
// f . . f . . . . . .
// . g g . . . . . . .


// a b c d e f g 
// y y y y y y y

// 1. !9 => e
// 2. !9 & !3 => b 
// 3. !b & !2 => f 
// 4. !6 => c
// 5. !0 => d
// 6. 7 & !f & !c  => a 
// 7. (!2 | !3 | !5 | !0 | !6 | !9 | 1 | 7 | 4) xor 8 => g


export const characterBitMaps: Record<CSymbols | "all", number> = {
    a: 1, b: 2, c: 4, d: 8, e: 16, f: 32, g: 64, all: 127
}
const symbolOptions: CSymbols[] = ["a","b","c","d","e","f","g"];
const { a,b,c,d,e,f,g}=characterBitMaps;

const char2mapPosition: Record<CSymbols, number> = { a:0, b:1, c:2, d:3, e:4, f:5, g:6 }

// manually decoded expected bit number
const manualDecode = [a|b|c|e|f|g, c|f,  a|c|d|e|g, a|c|d|f|g, b|c|d|f, a|b|d|f|g,  a|b|d|e|f|g, a|c|f,  a|b|c|d|e|f|g, a|b|c|d|f|g]

const symbolBit2Number = {
    [manualDecode[0]]:0,
    [manualDecode[1]]:1,
    [manualDecode[2]]:2,
    [manualDecode[3]]:3,
    [manualDecode[4]]:4,
    [manualDecode[5]]:5,
    [manualDecode[6]]:6,
    [manualDecode[7]]:7,
    [manualDecode[8]]:8,
    [manualDecode[9]]:9

}

// test this not operation
export const not = (number:number):number => characterBitMaps.all ^ number

// bitFlag representation of the collection of symbols above
// i.e., symbol 2 => a | b | d | e | f  = 0111011 (those bit symbols)
export const decodeValidation =  (numbers: number[], cypher: (CSymbols | null)[]) => {
    if(cypher.includes(null)){
        // only check when all numbers are guessed
        return true;
    }
    
    const e = not(numbers[9]); // y
    const b = not(e) & not(numbers[3]); // y
    const f = not(b) & not(numbers[2]); // 
    const c = not(numbers[6]);
    const d = not(numbers[0]);
    const a = numbers[7] & not(f) & not(c); // ?
    const g = numbers[8] ^ ( not(numbers[2]) | not(numbers[3]) | not(numbers[5]) | not(numbers[0]) | not(numbers[6]) | not(numbers[9]) | numbers[1] | numbers[7] | numbers[4]);
   
    // console.log({a,b,c,d,e,f,g}, characterBitMaps)
    return  a === characterBitMaps.a && b === characterBitMaps.b && c === characterBitMaps.c && d === characterBitMaps.d && e === characterBitMaps.e && f === characterBitMaps.f && g === characterBitMaps.g;
}

const has = (str: string, ...characters: string[]) => {
    while(characters.length){
        let char= characters.pop();
        if(char && !str.includes(char)){
            return false
        }
    }
    return true
}


// map symbols in string to correct ones
// be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
// [ b, a, d, f, e, e, g] <--- guess
//   ^  ^  ^  ^  ^  ^  ^
//   a, b, c, d, e, f, g

type RRee = { numbers: number[], symbols: number[]}
export const reduceSymbolToBit = (cypher: (CSymbols | null)[]) => (acc: RRee, symbol:string): RRee => {
    let bit = 0;
    let cypherMap = cypher.reduce((mp, x, i) => x ? ({ ...mp, [x]: symbolOptions[i]}): mp, {} as any);
    let decodedSymbol = "";

    for(let i = 0; i < symbol.length; i++){
        let char = symbol[i] as CSymbols
        // map character 
        let mappedCharacter = cypherMap[char] as CSymbols;

        if(!mappedCharacter){
            return acc
        }
        // another 3 hours later... "these have to be the mapped symbols -- FFFFFF x 2"
        // get mappedCharacter bit
        let mappedBitFlag = characterBitMaps[mappedCharacter];
        // if( cypher[0] === "d" && cypher[1] === "e" && cypher[2] === "a" &&  cypher[3] === "f" &&  cypher[4] === "g" &&  cypher[5] === "b"){
        //     console.log([char, "->", mappedCharacter, mappedBitFlag.toString(2)])
        // }
        decodedSymbol += mappedCharacter
        bit = bit | mappedBitFlag;
    }
    
    if( decodedSymbol.length === 2){
        acc.numbers[1] = bit
    } else if( decodedSymbol.length === 3){
        acc.numbers[7] = bit
    } else if( decodedSymbol.length === 4){
        acc.numbers[4] = bit
    } else if( decodedSymbol.length === 7){
        acc.numbers[8] = bit;
        // 3 hours later... "these have to be the mapped symbols -- FFFFFF"
    } else if(has(decodedSymbol, "a", "b", "c", "e", "f", "g") && decodedSymbol.length === 6){
        // if( cypher[0] === "d" && cypher[1] === "e" && cypher[2] === "a" &&  cypher[3] === "f" &&  cypher[4] === "g" &&  cypher[5] === "b"){
        //     console.log(symbol,"=>",decodedSymbol, cypherMap, bit)
        // }
        acc.numbers[0] = bit;
    } else if(has(decodedSymbol, "a", "b", "d", "e", "f", "g") && decodedSymbol.length === 6){
        acc.numbers[6] = bit;
    } else if(has(decodedSymbol, "a", "b", "c", "d", "f", "g") && decodedSymbol.length === 6){
        acc.numbers[9] = bit;
    } else if(has(decodedSymbol, "a", "c", "d", "e", "g") && decodedSymbol.length === 5){
        acc.numbers[2] = bit;
    } else if(has(decodedSymbol, "a", "c", "d", "f", "g") && decodedSymbol.length === 5){
        acc.numbers[3] = bit;
    } else if(has(decodedSymbol, "a", "b", "d", "f", "g") && decodedSymbol.length === 5){
        acc.numbers[5] = bit;
    } else {
        // console.log("unmapped", symbol, cypher, bit)
    }
    // if( cypher[0] === "a" && cypher[1] === "c" && cypher[2] === "b" &&  cypher[3] === "d" &&  cypher[4] === "e" &&  cypher[5] === "f"){
    //     if(has(symbol, "a", "c", "d", "e", "g")){
    //         console.log({symbol, bit}, symbol.length)
    //     }
    //     console.log(symbol, cypher.join(":"), bit.toString(2))
    // }
    // if( cypher[0] === "d" && cypher[1] === "e" && cypher[2] === "a" &&  cypher[3] === "f" &&  cypher[4] === "g" &&  cypher[5] === "b"){
    //     console.log(symbol, cypher.join(":"), bit.toString(2), bit)
    // }
    return {
        ...acc,
        symbols: [ ...acc.symbols, bit]
    };
}

export const decodeNumbers = (point: number, cypher: (CSymbols | null)[], symbols: string[]) => {
    if(point >= cypher.length){
        // console.log(cypher.join(":"), "is Valid");
        return true;
    }

    
    if(!cypher[point]){
        let options = symbolOptions.filter(p => !cypher.includes(p));
        for(let i = 0; i < options.length; i++){
            cypher[point] = options[i];
            // take map and convert symbol array to bit array.
            const { numbers } = symbols.reduce(reduceSymbolToBit(cypher), { numbers:[], symbols:[] })
            // if( cypher[0] === "d" && cypher[1] === "e" && cypher[2] === "a" &&  cypher[3] === "f" &&  cypher[4] === "g" &&  cypher[5] === "b"){
            //     console.log(cypher, numbers)
            // }
            // if(cypher.length === 7 && cypher.every(x => !x)){
            //     console.log(cypher.join(":"), numbers, symbols);
            // }
            if(decodeValidation(numbers, cypher)){
                if(decodeNumbers(point+1, cypher, symbols)){
                    return true
                }
            }
        }
    }
    cypher[point] = null;
    return false;
}


export const d_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");

    // decode with numbers
    const segmentNums = [];
    for( let i = 0; i< lines.length; i++){
        
        const [ numbersString, segments ] = lines[i].split(" | ");  
        let symbols = [...numbersString.split(" "), ...segments.split(" ")]
        
        // recursive guess
        let decodedMap = Array(7).fill(null)
        const decodeSuccess = decodeNumbers(0, decodedMap, symbols)
        if(!decodeSuccess){
            throw "THE f error";
        }
        const { symbols: decSymbols } = segments.split(" ").reduce(reduceSymbolToBit(decodedMap), { numbers:[], symbols:[]})
        segmentNums.push(Number(decSymbols.map(bit => symbolBit2Number[bit]).join("")))
        // console.log(Number(decSymbols.map(bit => symbolBit2Number[bit]).join("")))
        // console.log(decSymbols, symbols, decodedMap)
    }
    return segmentNums.reduce((val,x)=> val+x, 0)
    
}
