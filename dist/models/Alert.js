"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
exports.Alert = Database_1.database.define('alert', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    bug: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    machine: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
