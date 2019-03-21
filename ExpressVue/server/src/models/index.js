const fs = require('fs') // node.js module to create file system
const path = require('path') // app and path, relative path
const Sequelize = require('sequelize') // connecting to the DB
const config = require('../config/config') // file config for the server
const db = {

}

const sequelize = new Sequelize( // creation of the obj sequelize --> making the connection with the config
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

fs // give us the ability to add more models down the road
    .readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
