// imports
import fs from "fs";
import { join } from "path";

export const d4 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const entries = chunk.toString().split("\n");
}


export const d4_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    const entries = chunk.toString().split("\n");
}
