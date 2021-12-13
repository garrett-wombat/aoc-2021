// imports
import fs from "fs";
import { join } from "path";

type Close = ")" | "}" | "]" | ">";
const closers = new Set<any>([")", "}", "]", ">"]);
type Open = "(" |  "{" | "[" | "<";
const openers = new Set<any>(["(", "{", "[", "<"]);


const points: Record<Close, number> =  {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
}

export const d = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");

    const symbMatch: Record<Open,Close> = {
        "(":")",
        "{":"}",
        "[":"]",
        "<":">",
    }
    let pointTotal = 0;
    while(lines.length){
        const line = (lines.pop() as string).split("");
        let char: Open | Close | undefined;
        let errorChar;
        const stack: Open[] = [];
        while(line?.length){
            char = line.shift() as any;
            // if(line.length === 1){
            //     console.log(char)
            // }

            if(closers.has(char)){
                let symb  =  stack.pop()
                let matched = symbMatch[symb as Open]
                if(!symb || matched !== char){
                    // console.log("expected", matched,"got", char)
                    pointTotal = pointTotal + points[char as Close];
                    errorChar = char
                    break; 
                }
            } else if(openers.has(char)) {
                stack.push(char as Open);
                continue;
            }
        }
    }
    return pointTotal
    
}


export const d_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");

    const symbMatch: Record<Open,Close> = {
        "(":")",
        "{":"}",
        "[":"]",
        "<":">",
    }
    const autoCompletePoint: Record<Close, number> =  {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4
    }

    let points = [];
    while(lines.length){
        const line = (lines.pop() as string).split("");
        let char: Open | Close | undefined;
        let errorChar;
        const stack: Open[] = [];
        while(line?.length){
            char = line.shift() as any;

            if(closers.has(char)){
                let symb  =  stack.pop()
                let matched = symbMatch[symb as Open]
                if(!symb || matched !== char){
                    errorChar = char
                    break; 
                }
            } else if(openers.has(char)) {
                stack.push(char as Open);
                continue;
            }
        }
        if(!errorChar){
            let pointTotal = 0;
            while(stack.length){
                let char = stack.pop()
                pointTotal = (pointTotal * 5) + autoCompletePoint[symbMatch[char as Open]]
            }
            points.push(pointTotal);
        }
    }
    let l = points.length;
    let m = Math.floor(l/2);
    return points.sort((a,b)=> a-b)[m];
    
}
