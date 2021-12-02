// imports
import fs from "fs";
import { join } from "path";

export const upDownForward = (path: string, withAim?: boolean ): number => {
        let depth = 0;
        let forward = 0;
        let aim = 0;
        
        const chunk = fs.readFileSync(join(__dirname, path))
        const entry = chunk.toString().split("\n");
        const entryLength = entry.length;
        
        for(let i=0; i < entryLength; i++){
            const [command, amount] = entry[i].split(" ");
            switch(command){
                case "up":{
                    if(!withAim){
                        depth -= Number(amount);
                    }
                    aim -= Number(amount)
                    break;
                }
                case "down":{
                    if(!withAim){
                        depth += Number(amount);
                    }
                    aim += Number(amount);
                    break;
                }
                default: {
                    if( withAim){
                        depth += (aim * Number(amount));
                    } 
                    forward += Number(amount);
                    break;
                }
            }
            // console.log(command,amount, aim, forward, depth)
        }
        return depth * forward;
}