// imports
import fs from "fs";
import { join } from "path";

type Coord = [number,number]
const getLineEnds = (line:string): [Coord,Coord] => {
    const [p1, p2] = line.split(" -> ");
    const xy1 = p1.split(",").map(x => Number(x)) as Coord;
    const xy2 = p2.split(",").map(x => Number(x)) as Coord;
    return [xy1, xy2];
}

class VentMap {
    // not going to make a map, just a hashMap
    // ventMap: number[][];
    withDiagonals: boolean;
    overlapCount:Record<number,number> = {"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0};
    ventCoordHashMap:Record<string,number> = {}  

    constructor(withDiagonals?: boolean){
        this.withDiagonals = withDiagonals || false;
    }

    registerLine(p: Coord, t: Coord){
        let [xStart, xFinish ] = p[0] > t[0] ? [t[0], p[0]] : [p[0], t[0]];
        let xInc = t[0] > p[0] ? true : false;
        let [yStart, yFinish ] = p[1] > t[1] ? [t[1], p[1]] : [p[1], t[1]];
        let yInc = t[1] > p[1] ? true : false;

        let direction = xStart === xFinish ? "x" : "y";

        if( xStart !== xFinish && yStart !== yFinish ){
            if(!this.withDiagonals){
                return
            }
            let len = xFinish - xStart;
            let xp = Array(len+1).fill(p[0]).map((i, idx )=> xInc ? i+idx : i-idx );
            let yp = Array(len+1).fill(p[1]).map((i, idx )=> yInc ? i+idx : i-idx );
            // console.log(p,t, yp.pop(), xp.pop(), yp,xp);


            for(let i = 0; i <= len; i++){

                let y = yp[i];
                let x = xp[i];
                
                if(!this.ventCoordHashMap[`${x}.${y}`]){
                    this.ventCoordHashMap[`${x}.${y}`] = 0;
                }
                this.ventCoordHashMap[`${x}.${y}`]++
                this.overlapCount[this.ventCoordHashMap[`${x}.${y}`]]++
            }
            return
        }

        if( direction === "x"){
            for(let i = yStart; i <= yFinish; i++){
                if(!this.ventCoordHashMap[`${xStart}.${i}`]){
                    this.ventCoordHashMap[`${xStart}.${i}`] = 0;
                }
                this.ventCoordHashMap[`${xStart}.${i}`]++
                this.overlapCount[this.ventCoordHashMap[`${xStart}.${i}`]]++
            }
        } else {
            for(let i = xStart; i <= xFinish; i++){
                if(!this.ventCoordHashMap[`${i}.${yStart}`]){
                    this.ventCoordHashMap[`${i}.${yStart}`] = 0;
                }
                this.ventCoordHashMap[`${i}.${yStart}`]++
                this.overlapCount[this.ventCoordHashMap[`${i}.${yStart}`]]++
            }
        }
    }
    
}

export const d5 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");
    const vents = new VentMap()
    while(lines.length){
        const line =  lines.pop();
    // console.log(line)
        const [p,t] = getLineEnds(line as string);
        vents.registerLine(p,t);
    }
    // console.log(vents.overlapCount)
    return vents.overlapCount[2];
}


export const d5_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");
    const vents = new VentMap(true)
    while(lines.length){
        const line =  lines.pop();
        const [p,t] = getLineEnds(line as string);
        vents.registerLine(p,t);
    }
    // console.log(vents.overlapCount)
    return vents.overlapCount[2];
}
