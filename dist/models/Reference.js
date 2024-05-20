"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reference = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
exports.Reference = Database_1.database.define('reference', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_number: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});
