// Dependencies
const fs = require('fs');
const converter = require('json-2-csv')
// Error
import { httpError } from "../../config/CustomError";

function getPathLog(){
    const date = new Date();

    const day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
    const month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    const year = date.getFullYear();
    
    const fileName = `app-${day}-${month}-${year}.log`;
    const path = "src/config/logs/"+fileName;
    return path;
}

function getLogs(){
    const path = getPathLog();
    if(!fs.existsSync(path)){
        throw new Error("No logs");
    }
    const logData = fs.readFileSync(path, 'utf8');
    if(logData === ""){
        throw new Error("No logs");
    }
    const transfromedLogs = logData.split('\n').slice(0,-1).map((line: string) => {
        const log = JSON.parse(line);
        return {
            "Fecha": log.timestamp,
            "Nivel": log.level,
            "Mensaje": log.message
        }
    });
    return transfromedLogs
}

export function getLogsText(){
    try{
        const logData = getLogs();
        const transformedLogs = logData.map((log: Record<any,any>) => {
            return `${log["Fecha"]} - ${log["Nivel"]}: ${log["Mensaje"]}`;
        }).join('\n');
        return transformedLogs;
    }catch(error){
        return "No logs"
    }
}

export function exportLogs2Excel(){
    try{
        const csv = converter.json2csv(getLogs());
        const path = "src/config/logs/csv/logs.csv";
        fs.writeFileSync(path, csv);
        return path;
    }catch(error){
        throw new httpError("Error al exportar csv", 500);
    }
}