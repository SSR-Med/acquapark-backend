"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
// Dependencies
const sequelize_1 = require("sequelize");
// Database
const Database_1 = require("../config/Database");
exports.Record = Database_1.database.define('record', {
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
    reference: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    weight: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    large: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }
});
