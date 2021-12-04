// imports
import fs from "fs";
import { join } from "path";

// we could definitely improve this
// - make only one window and compare to prev value.
// - just save values dont create array.
// - dont use ts

export const d1 = (path: string, windowSize: number = 3): number => {
        let count = 0;
        let windowB = [];
        let windowBSum =  0;
        let windowA = [];
        let windowASum =  0;
        
        const chunk = fs.readFileSync(join(__dirname, path))
        const entry = chunk.toString().split("\n");
        const entryLength = entry.length;
        
        for(let i=0; i < entryLength; i++){
            let value = Number(entry[i])
            // console.log(windowB, windowBSum, windowA, windowASum);
            if(i === 0) {
                windowBSum += value
                windowB.push(value)
                continue
            };
            let prevValue = Number(entry[i-1])

            windowB.push(value)
            windowBSum += value
            windowA.push(prevValue)
            windowASum += prevValue

            if(windowB.length > windowSize ){
                let a = windowB.shift()
                if(a){ 
                    windowBSum = windowBSum  - a
                }
            }
            if(windowA.length > windowSize ){
                let b = windowA.shift()
                if(b){
                    windowASum = windowASum - b
                }
            }
            
            if(i >= windowSize && windowBSum > windowASum){
                count++
            }
        }
        // console.log(count)
        return count;
}