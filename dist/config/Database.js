"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
// Dependencies
const { Sequelize } = require('sequelize');
// Env variables
const Config_1 = require("./Config");
exports.database = new Sequelize({
    host: Config_1.database_host,
    database: Config_1.database_name,
    username: Config_1.database_user,
    password: Config_1.database_password,
    port: Config_1.database_port,
    dialect: 'postgres',
    logging: false,
    "dialectOptions": {
        "ssl": {
            "require": true
        }
    },
    define: {
        timestamps: false
    },
});
