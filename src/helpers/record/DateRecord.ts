export function checkDate(date: string){
    if (!isNaN(Date.parse(date))){
        return true
    }
    return false
}