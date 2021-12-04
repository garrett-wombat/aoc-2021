// imports
import fs from "fs";
import { join } from "path";



const toBackwardsBit = (bit: number, len: number): number => {
    const bitString = bit.toString(2);
    let appendZeros = "";
    
    console.log({bitString, le:bitString.length, len})
    if( bitString.length < len){
         appendZeros = Array(len - bitString.length).fill(0).join("");
    } 

    return toBit(appendZeros + bitString)
}

const reverseString = (str: string):string => {
    let res = "";
    let l = str.length-1;
    let i = 0;
    while( i <= l){
        res += str[l-i];
        i++
    }
    return res;
}


const toBit = (bitString: string):number =>{
    let number = 0;
    let i = 0;
    while(i < bitString.length){
        if(bitString[i] === "1"){
            number |= (2**i);
        };
        i++;
    }
    return number;
}

export const d3_2 = (path: string): number => {

        const chunk = fs.readFileSync(join(__dirname, path))
        const entries = chunk.toString().split("\n");
        const bitLength = entries[0].length
        // console.log(bitLength, entries[0])
        let filteredOG = entries.map(bitString => toBit(bitString));
        let filteredEntries = filteredOG.slice();
        let co2Bit:number, o2:number;
        

        let testBit = 1;
        
        while(filteredEntries.length > 1){
            let ones = [];
            let zeros = [];
            for( let j = 0; j < filteredEntries.length; j++){
                let bit = filteredEntries[j]
                if((bit & testBit) === testBit){
                    ones.push(bit);
                } else {
                    zeros.push(bit);
                }
            }
            filteredEntries = (ones.length >= zeros.length) ? ones : zeros;
            testBit = testBit << 1;
        }
        
        o2 = toBackwardsBit(filteredEntries[0], bitLength)
        
        // convert to backwards bit?

        testBit = 1;
        filteredEntries = filteredOG.slice();

        while(filteredEntries.length > 1){
            let ones = [];
            let zeros = [];
            // console.log(filteredEntries);
            for( let j = 0; j < filteredEntries.length; j++){
                let bit = filteredEntries[j]
                // console.log(bit, bit.toString(2));
                if((bit & testBit) === testBit){
                    ones.push(bit);
                } else {
                    zeros.push(bit);
                }
            }
            filteredEntries = (ones.length >= zeros.length) ? zeros : ones;
            testBit = testBit << 1;
        }

        co2Bit = toBackwardsBit(filteredEntries[0], bitLength)

        console.log(co2Bit, o2)
        return co2Bit*o2


}

export const d3 = (path: string ) => {

        const chunk = fs.readFileSync(join(__dirname, path))
        const entries = chunk.toString().split("\n");
        const bitLength = entries[0].length
        let gammaBit = 0; // most common bit
        let eBit = 0; // least common bit
        
        let bitMap: Record<number, number> = {}
        const entryLength = entries.length;
        
        for(let i=0; i < entryLength; i++){
            let testBit = 1;
            let currentBit = toBit(entries[i]);
            console.log(entries[i], currentBit, currentBit.toString(2) )
            for( let j = 0; j <= entries[i].length; j++){
                if( (testBit & currentBit) === testBit){
                    if(!bitMap[testBit]){
                        bitMap[testBit] = 1;
                    } else {
                        bitMap[testBit]++;
                    }
                }
                testBit = testBit << 1;
            }
        }
        
        console.log(bitMap)

        Object.entries(bitMap).forEach(([key, ent]: [string, number]) => {
            if(ent < (entryLength / 2)){
                gammaBit |= Number(key);
            } else { 
                eBit |= Number(key);
            }
        })
        // WTF - counting the bit convention has changed in the last step????
        const g = gammaBit.toString(2);
        const e = eBit.toString(2);
        console.log({gammaBit, eBit}, toBackwardsBit(gammaBit, bitLength),  toBackwardsBit(eBit, bitLength), gammaBit * eBit)
        return toBackwardsBit(gammaBit, bitLength) * toBackwardsBit(eBit, bitLength);
}