"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDate = void 0;
function checkDate(date) {
    if (!isNaN(Date.parse(date))) {
        return true;
    }
    return false;
}
exports.checkDate = checkDate;
