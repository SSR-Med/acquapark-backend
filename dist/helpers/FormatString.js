"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeWords = exports.capitalizeFirstLetter = exports.deleteBlankSpaces = void 0;
function deleteBlankSpaces(name) {
    name = name.replace(/\s+/g, " ").trim();
    return name;
}
exports.deleteBlankSpaces = deleteBlankSpaces;
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function capitalizeWords(name) {
    return name.replace(/(^\w{1})|(\s+\w{1})/g, match => match.toUpperCase());
}
exports.capitalizeWords = capitalizeWords;
