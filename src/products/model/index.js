const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const password = process.env.DB_PASS || process.env.DB_PASSWORD || null;

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    password,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false,
        retry: {
            max: 5
        }
    }
);

module.exports = sequelize;