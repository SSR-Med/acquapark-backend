// Dependencies
const {Sequelize} = require('sequelize');
// Env variables
import { database_host, database_url } from "./Config";

export const database = new Sequelize(database_url, {
    host: database_host,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false
    }
});