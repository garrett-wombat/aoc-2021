// imports
import fs from "fs";
import { join } from "path";



export const d = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");
    const rows = lines.length;
    const columns = lines[0].length;

    const getVerticalHeight = (row: number, col: number): number => {
        if(row >= rows || col >= columns || row < 0 || col < 0){
            return 10
        }
        return Number(lines[row][col])


    }

    const isMim = (row:number, col:number)=>{
        let val = Number(lines[row][col])
        return val < getVerticalHeight(row+1, col) &&
        val < getVerticalHeight(row, col+1) && 
        val < getVerticalHeight(row-1, col) && 
        val < getVerticalHeight(row, col-1) 
        // val < getVerticalHeight(row+1, col+1) && 
        // val < getVerticalHeight(row-1, col+1) && 
        // val < getVerticalHeight(row-1, col-1) && 
        // val < getVerticalHeight(row+1, col-1)
    }

    const lowPoints = [];
    for(let i = 0; i < rows; i++){
        for(let j = 0; j<columns; j++){
            if( isMim(i,j)){
                lowPoints.push(Number(lines[i][j]))
            }
        }
    }

    return lowPoints.reduce((sum, val)=> sum += val+1, 0)
    
}



export const d_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");
    const rows = lines.length;
    const columns = lines[0].length;


    const basinValueMap: Record<string,number> = {};
    const basinPosIdMap: Record<string,string> = {};
    
    const getVerticalHeight = (row: number, col: number): number => {
        if(row >= rows || col >= columns || row < 0 || col < 0){
            return 1000
        }
        return Number(lines[row][col])
    }

    const traverseBasin = (row: number, col: number, bId: string): number => {
        let height = getVerticalHeight(row,col);
        if( !basinPosIdMap[`${row}.${col}`] && height < 9){
            basinPosIdMap[`${row}.${col}`] = bId;
            // console.log(basinPosIdMap[`${row}.${col}`], row, col, height,  lines,)
            return 1 + traverseBasin(row+1, col, bId) + traverseBasin(row, col+1, bId) + traverseBasin(row-1, col, bId) + traverseBasin(row, col-1, bId);
        } else if(height === 9) {
            basinPosIdMap[`${row}.${col}`] = bId;
            return 0;
        } 
        return 0;
    } 

    let sizes = []
    for(let i = 0; i < rows; i++){
        for(let j = 0; j<columns; j++){
            if(!basinPosIdMap[`${i}.${j}`]){
                sizes.push(traverseBasin(i,j, `${i}.${j}`));
            }
        }
    }
    let S = sizes.sort((a,b)=> b-a)
    return S[0]*S[1]*S[2]

}
