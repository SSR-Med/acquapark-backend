// Dependencies
const bcrypt = require('bcrypt');
// Env variables
import { salt } from "../../config/Config";

export function generatePassword(password:string){
    return bcrypt.hashSync(password, salt);
}
export function comparePassword(password:string, hash:string){
    return bcrypt.compareSync(password, hash);
}