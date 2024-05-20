"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
// Dependencies
const { Sequelize } = require('sequelize');
// Env variables
const Config_1 = require("./Config");
exports.database = new Sequelize(Config_1.database_url, {
    host: Config_1.database_host,
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false
    }
});
