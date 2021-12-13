// imports
import fs from "fs";
import { join } from "path";

const maxE = 10;

const printGrid = (grid: number[][]) => {
    console.log(grid.map( line => line.join("")).join("\n"));
}

const cascade = (x:number, y:number, grid: number[][], xMax: number, yMax: number): void => {
    if(x < 0 || y < 0 || x >= xMax || y >= yMax){
        return 
    }
    if(grid[x][y] > maxE){
        return;
    }
    
    grid[x][y]++
    if( grid[x][y] === maxE) {
        cascade(x+1,y+1,grid, xMax, yMax);
        cascade(x+1,y,grid, xMax, yMax);
        cascade(x+1,y-1,grid, xMax, yMax);
        cascade(x,y-1,grid, xMax, yMax);
        cascade(x-1,y-1,grid, xMax, yMax);
        cascade(x-1,y,grid, xMax, yMax);
        cascade(x-1,y+1,grid, xMax, yMax);
        cascade(x,y+1,grid, xMax, yMax);
    }
}

const relax = (grid: number[][]):number => {
    let flashes = 0;
    let yL = grid[0].length;
    let xL = grid.length;
    for(let x = 0; x < xL; x++){
        for(let y = 0; y < yL; y++){
            if( grid[x][y] >= maxE){
                grid[x][y] = 0;
                flashes++;
            } 
        }
    }
    return flashes;
} 


const step = (grid: number[][]):void => {
    let yL = grid[0].length;
    let xL = grid.length;
    for(let x = 0; x < xL; x++){
        for(let y = 0; y < yL; y++){
            grid[x][y]++
            if( grid[x][y] === maxE){
                cascade(x+1,    y+1,    grid, xL, yL);
                cascade(x+1,    y,      grid, xL, yL);
                cascade(x+1,    y-1,    grid, xL, yL);
                cascade(x,      y-1,    grid, xL, yL);
                cascade(x-1,    y-1,    grid, xL, yL);
                cascade(x-1,    y,      grid, xL, yL);
                cascade(x-1,    y+1,    grid, xL, yL);
                cascade(x,      y+1,    grid, xL, yL);
            } 
        }
    }
}

export const d = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");
    let grid = lines.map(line => line.split("").map(x => Number(x)))
    let steps = 100;
    let flashes = 0;
    while(steps>0){
        // printGrid(grid);
        step(grid);
        flashes += relax(grid);
        steps--;
    }
    return flashes

}




export const d_2 = (path: string) => {
const chunk = fs.readFileSync(join(__dirname, path))
    const lines = chunk.toString().split("\n");
    let grid = lines.map(line => line.split("").map(x => Number(x)))
    let steps = 0;
    let flashCount = 0;
    while(flashCount !== 100 && steps < 1000){
        // printGrid(grid);
        step(grid);
        flashCount = relax(grid);
        steps++;
    }
    return steps
    
}
