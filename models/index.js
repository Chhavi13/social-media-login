const dbconfig = require('../config/db.config')
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {

    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    logging:false,
    pool: {

        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle


    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize

db.users = require('../models/User')(sequelize, Sequelize)

db.fbusers = require('../models/fbUser')(sequelize,Sequelize)

module.exports = db;