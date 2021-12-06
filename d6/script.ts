// imports
import fs from "fs";
import { join } from "path";

type nMap = Record<number, number>;
type nArrMap = Record<string, number[]>;

let sizeLoop = [ '0', '1', '2', '3', '4', '5', '6', '7', '8']

const ageFish = (school?: number[]): number[] => {
    if(!school){
        return [];
    }

    let s: number[] = [];
    for(let i = 0; i<school.length; i++){
        const f = school[i]-1;
        if ( f < 0){      
            s.push(8,6);
        } else {
            s.push(f);
        }
    };
    return s;
    
}

export const d = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    let school = chunk.toString().split(",").map(f=> Number(f)) as number[];
    // remove ond multiply duplicate aged initial fish
    // const initialFishMap = {}

    let time = 80;
    
    for(let i = 0; i<time; i++){
        school = ageFish(school)
    }
    return school.length
}

// part 2

const query = (school: number[]):[nMap, nArrMap]=>{
    let map: nMap = {};
    let schoolMultipleMap: nArrMap = {};
    
    school.forEach(f => {
        if(map[f]) {
            map[f]++
        }else{
            map[f]= 1
            schoolMultipleMap[f]=[f];
        }
    })
    
    return [map, schoolMultipleMap]
}

const multiplyMap = (map: any, multiple: number)=>{
    let nMap = { ...map};
    for(let i in sizeLoop){
        nMap[i]=nMap[i]*multiple;
    }
    return nMap
}

// assumes a and b ar identital except for values
const joinMap = (a: nMap, b: nMap): nMap => {
    let nMap: nMap = {}
    for( let j in sizeLoop){
        nMap[j] = (b[j] || 0) + (a[j] || 0);
    }
    
    return nMap;
}

export const d_2 = (path: string) => {
    const chunk = fs.readFileSync(join(__dirname, path))
    let school = chunk.toString().split(",").map(f=> Number(f)) as number[];

    let time = 256;

    let [schoolMultipleMap, uniqueFishAgeSchoolMap] = query(school);
    // console.log(schoolMultipleMap, uniqueFishAgeSchoolMap)
    for(let i = 0; i<time; i++){
        for(let j in sizeLoop ){
            uniqueFishAgeSchoolMap[j] = ageFish(uniqueFishAgeSchoolMap[j]);
        }

        // pretty arbitrary reset time
        if(i>0 &&  i % 30 == 0){
            let newMultipleMap: nMap = {};

            // for initial fish size
            for(let j = 0; j<9; j++){
                // get map of fish in this shool
                let [multipleMap] = query(uniqueFishAgeSchoolMap[j])

                // multiply that map by the current multiple
                multipleMap = multiplyMap(multipleMap, schoolMultipleMap[j])
                newMultipleMap = joinMap(newMultipleMap, multipleMap);
            }
            

            // at this point we have newMultipleMap with the count af all of the fish at each stage
            // reset the uniqueFishAgeSchoolMap and school map
            
            uniqueFishAgeSchoolMap = Object.keys(newMultipleMap).reduce((acc, f)=>{
                acc[f]=[Number(f)];
                return acc;
            }, {} as nArrMap)
            schoolMultipleMap = {...newMultipleMap}
        }
        


    }
    
    // do the final computation
    let count = 0;
    for(let j = 0; j<9; j++){
        count += schoolMultipleMap[j]*uniqueFishAgeSchoolMap[j].length
    }
    // console.log(schoolMultipleMap, uniqueFishAgeSchoolMap, count)
    return count
}
