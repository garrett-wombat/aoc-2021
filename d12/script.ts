// imports
import fs from "fs";
import { join } from "path";

type NodeMap = Record<string, string[]>
const generateNodeMap = (map: NodeMap, path: string): NodeMap => {
    const [a,b] = path.split("-");
    if( map[a]){ 
        map[a].push(b);;
    } else {
        map[a]=[b];
    }
    if( map[b]){ 
        map[b].push(a);
    } else {
        map[b]=[a];
    }
    return map;
}

const isLower = (str:string) => str === str.toLocaleLowerCase() && str !== "start" && str !== "end";

const generatePath = (last: string, path: string, edges: NodeMap, deadEnds:string[]): string[] => {
    let next = [...edges[last]];
    let response = [];
    if( last === "start" && path.includes(".")){
        return [];
    }
        
    while(next.length){
        const edge = next.pop();
        if(!edge || deadEnds.includes(edge)){
            continue;
        }
        if( edge === "end") {
            response.push(`${path}.${edge}`);
            continue;
        }
    
       // if the next edge is lowercase, its already visited, and the last is caps. 
        if( edge !== "start" && path.includes(`.${edge}.`) && isLower(edge)){
            deadEnds.push(edge);
            continue;
        }
 
        response.push(...generatePath(edge, `${path}.${edge}`, edges, [...deadEnds]));
        
    }
    return response
}
export const d = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path));
    const edges = chunk.toString().split("\n");
    const pathMap  = edges.reduce(generateNodeMap, {});
    const paths = generatePath("start", "start", pathMap, []);
    return paths.length;
}


const generatePath2 = (last: string, path: string, edges: NodeMap, deadEnds:string[], firstLower: string | undefined): string[] => {
    let next = [...edges[last]];
    let response = [];
    if( last === "start" && path.includes(".")){
        return [];
    }
        
    while(next.length){
        const edge = next.pop();
        let newFirstLower = firstLower;
        if(!edge || deadEnds.includes(edge)){
            continue;
        }
        if( edge === "end") {
            response.push(`${path}.${edge}`);
            continue;
        }
    
        // if the next edge is lowercase and is already visited kill it
        if( edge !== "start" && path.includes(`.${edge}.`) && isLower(edge)){
            if(!newFirstLower){
                newFirstLower = edge;
            } else {
                deadEnds.push(edge);
                continue;
            }
        }
        response.push(...generatePath2(edge, `${path}.${edge}`, edges, [...deadEnds], newFirstLower));
    }
    return response
}
export const d_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path));
    const edges = chunk.toString().split("\n");
    const pathMap  = edges.reduce(generateNodeMap, {});
    const paths = generatePath2("start", "start", pathMap, [], undefined);
    return paths.length;
}
