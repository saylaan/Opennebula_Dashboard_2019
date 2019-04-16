const fs = require('fs') // node.js module to create file system
const path = require('path') // app and path, relative path
const Sequelize = require('sequelize') // connecting to the DB
const config = require('../config/config') // file config for the server
const db = {

}
const Opennebula = require('opennebula')
const one = new Opennebula('geoffroy:2961Sailaan1992!',
  'http://vlab.ale-aapp.com:2633/RPC2')

const sequelize = new Sequelize( // creation of the obj sequelize --> making the connection with the config
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

// const folderModels = [
//     "Message",
//     "Template",
//     "Url",
//     "User",
//     "Vlab",
//     "Vm"
// ]


// TODO : GENERIC PUT IN WITH MODELS.

fs // give us the ability to add more models down the road
    .readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

// const vm = one.getVM(295)

// vm.info(function(err, data) {
// const test = data.VM.NAME
// console.log(data.VM.NAME)
// })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
