// imports
import fs from "fs";
import { join } from "path";

const returnBoard = (board:string ): number[][] => {
    const trimmed = board.trim();
    const boardArray = trimmed.split('\n');
    const boardMatrix = boardArray.map(
        (line:string) => 
            line.trim().split(/\s+/).map(number => Number(number)
        )
    );
    return boardMatrix;
}

class Board {
    board: number[][];
    chosenNumbers: number[] = [];
    boardSum: number = 0;
    numberMap: Record<string, number[]> = {};
    rowBitFlags: number[];
    columnBitFlags: number[];
    hasWon: boolean = false;

    constructor(board: number[][]){
        this.board = board;
        this.rowBitFlags = new Array(board.length).fill(0);
        this.columnBitFlags = new Array(board[0].length).fill(0);
        const boardSize = this.board.length
        for(let i = 0; i < boardSize; i++) {
            for(let j = 0; j < boardSize; j++) {
                this.numberMap[this.board[i][j]] = [i,j];
                this.boardSum += this.board[i][j];
            }
        }
    }

    // returns if its a winner or not
    addNumber(number:number): number | undefined {
        if( this.numberMap[number] && !this.hasWon){
            this.chosenNumbers.push(number);
            let [i,j] = this.numberMap[number]
            this.rowBitFlags[i]++;
            this.columnBitFlags[j]++;
            
            if( this.rowBitFlags[i] >= 5 ){
                this.hasWon = true;
                return this.scoreBoard() * number;
            }

            if( this.columnBitFlags[j] >= 5){
                this.hasWon = true;
                return this.scoreBoard() * number;
            }
        }
        return undefined;
    }

    scoreBoard(): number {
        return this.boardSum - this.chosenNumbers.reduce((sum, val) => sum += val, 0);
    }

}


export const d4 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const [instructionStrings, ...boards] = chunk.toString().split("\n\n");
    
    // generate list
    const instructions = instructionStrings.trim().split(',').map( numbers => Number(numbers))

    const allBoards = boards.map(boardMatrix => new Board(returnBoard(boardMatrix)))
    
    
    let winningBoards: number[] = [];
    let i = 0;
    while(!winningBoards.length){
        let chosenOne = instructions[i];
        allBoards.forEach((board, id) => {
            let winner = board.addNumber(chosenOne);
            if( winner !== undefined){
                // console.log({i, id, winner, board});
                winningBoards.push(winner)
            }
        })
        // console.log(i);
        if( i > instructions.length){
            throw "no more moves"
        }
        i++;

    }
    // console.log(winningBoards)
    return Math.max(...winningBoards)
}


export const d4_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const [instructionStrings, ...boards] = chunk.toString().split("\n\n");
    
    // generate list
    const instructions = instructionStrings.trim().split(',').map( numbers => Number(numbers))

    const allBoards = boards.map(boardMatrix => new Board(returnBoard(boardMatrix)))
    
    
    let winningBoards: number[] = [];
    let lastWinner;
    let i = 0;
    while(winningBoards.length < allBoards.length){
        let chosenOne = instructions[i];
        allBoards.forEach((board, id) => {
            let winner = board.addNumber(chosenOne);
            if( winner !== undefined){
                // console.log({i, id, winner, board});
                winningBoards.push(winner)
                // just save the last won board
                if( winningBoards.length === allBoards.length){
                    console.log(board, board.scoreBoard(), chosenOne)
                    lastWinner = winner
                }
            }
        })
        if( i > instructions.length){
            throw "no more moves"
        }
        i++;

    }
    return lastWinner
}
