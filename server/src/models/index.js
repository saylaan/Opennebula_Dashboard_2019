const fs = require('fs') // node.js module to create file system
const path = require('path') // app and path, relative path
const Sequelize = require('sequelize') // connecting to the DB
const config = require('../config/config') // file config for the server
const db = {}
const sequelize = new Sequelize( // creation of the obj sequelize --> making the connection with the config
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

const folderModels = [
    "Message",
    "Sip",
    "Template",
    "Url",
    "User",
    "Vlab",
    "Vm"
]

const isDirModels = file => {
    for (let i = 0; i < folderModels.length; i++) {
        if (folderModels[i] == file) {
            return (false)
        }
    }
    return(true)
}

console.log('\n\n#################### START INIT MODELS ####################')

fs
    .readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        if (isDirModels(file)) {
            const model = sequelize.import(path.join(__dirname, file))
            db[model.name] = model
        }
        for (let i = 0; i < folderModels.length; i++) {
            if (!isDirModels(file)) {
                fs
                .readdirSync(path.join( __dirname, file))
                .filter((tmp) => file !== 'index.js')
                .forEach((tmp) => {
                    console.log('######################## File in Folder :', tmp)
                    console.log('Path ==>', path.join( path.join( __dirname, file), tmp))
                    const model = sequelize.import(path.join( path.join( __dirname, file), tmp))
                    db[model.name] = model
                })
            break
            }
        }
    })

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

console.log('##################### END INIT MODELS #####################\n\n')

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
