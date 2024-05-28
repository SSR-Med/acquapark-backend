// Dependencies
const {Sequelize} = require('sequelize');
import { time } from "console";
// Env variables
import { database_name, database_host, database_password, database_port, database_user} from "./Config";

export const database = new Sequelize({
    host: database_host,
    database: database_name,
    username: database_user,
    password: database_password,
    port: database_port,
    dialect: 'postgres',
    logging: false,
    "dialectOptions": {
      "ssl":{
        "require": true
      }
    },
    define: {
      timestamps: false
    },
});
