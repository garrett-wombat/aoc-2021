// imports
import fs from "fs";
import { join } from "path";


const computeFuelSpent = (values: number[], guess: number): number => {
    return values.reduce((cost, x)=> cost += x > guess ? x - guess : guess - x, 0)
}


// [fuel, guess]
type guess = [number, number];


const slope = (a:guess, b:guess):number => {
    return (a[0]-b[0])/(a[1]-b[1])
}

const createSearchArray = (min:number ,max:number):number[] => {
    let diff = Math.floor((max - min)*0.009) + 1;
    // console.log(diff, min, max)
    if( min === max){
        return [min-1,min, min+1];
    }
    let search= [];
    for(let i = min; i<=max; i+=diff ) {
        search.push(i)
    }
    return search
}

export const d = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const numbers = chunk.toString().split(",").map(x=> Number(x));
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    let search: number[] = createSearchArray(min, max);    
    let y: number[] = [];
    let x: number[] = [];
    
    while (search.length) {
        let guess = search.shift();
        if ( typeof guess === "number") {
            let fuelCost = computeFuelSpent(numbers, guess);
            y.push(fuelCost);
            x.push(guess);
            if (!search.length) {
                // console.log(x,y)
                const diff = Math.abs(x[1]-x[0])
                if ( diff !== 1) {
                    let minIdx = y.findIndex(yi => yi === Math.min(...y))
                    if (minIdx === 0) {
                        search = createSearchArray( Math.max(min, x[0]-diff), x[1] );
                    } else if ( minIdx === x.length-1) {
                        search = createSearchArray(x[minIdx-1], Math.min(max, x[minIdx]+diff));
                    } else {
                        search = createSearchArray( x[minIdx-1], x[minIdx]+1);
                    }
                    // console.log({search})
                    x=[];
                    y=[];
                    continue;
                } else {
                    return Math.min(...y);
                }
            }
        } else {
            throw "guess not num";
        }

    }
}

const totalSum = (x:number): number => {
    if(x <= 0){
        return 0
    }
    return x + totalSum(x-1);
}

const computeFuelSpentP2 = (values: number[], guess: number): number => {
    return values.reduce((cost, x)=> cost += x > guess ? totalSum(x - guess) : totalSum(guess - x), 0)
}

export const d_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const numbers = chunk.toString().split(",").map(x => Number(x)); 
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    let search: number[] = createSearchArray(min, max);    
    let y: number[] = [];
    let x: number[] = [];
    
    while (search.length) {
        let guess = search.shift();
        if ( typeof guess === "number") {
            let fuelCost = computeFuelSpentP2(numbers, guess);
            y.push(fuelCost);
            x.push(guess);
            if (!search.length) {
                // console.log(x,y)
                const diff = Math.abs(x[1]-x[0])
                if ( diff !== 1) {
                    let minIdx = y.findIndex(yi => yi === Math.min(...y))
                    if (minIdx === 0) {
                        search = createSearchArray( Math.max(min, x[0]-diff), x[1] );
                    } else if ( minIdx === x.length-1) {
                        search = createSearchArray(x[minIdx-1], Math.min(max, x[minIdx]+diff));
                    } else {
                        search = createSearchArray( x[minIdx-1], x[minIdx]+1);
                    }
                    // console.log({search})
                    x=[];
                    y=[];
                    continue;
                } else {
                    return Math.min(...y);
                }
            }
        } else {
            throw "guess not num";
        }

    }
    
}
