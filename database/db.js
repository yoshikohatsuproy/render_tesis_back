import Sequelize from "sequelize";
import {  DB_USER, DB_HOST, DB_PASS, DB_NAME } from '../config.js'

export const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS, {
        host: DB_HOST,
        dialect: "mysql",
        loggin: console.log,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true,        
            }
        }
    },
);

 