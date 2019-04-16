
/* Import package */
const express = require('express')
const bodyParser = require('body-parser') // process json data
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models') // models folder with index.js file who return a sequelize obj
const config = require('./config/config')

console.log(`Server working... ${config.port}`)
/* build an express app */
const app = express()
/* enable packages */
app.use(morgan('combined')) // morgan doc -> print out log;
app.use(bodyParser.json())
app.use(cors()) // server hosted on different depend --> CARE (need good security)

require('./passport') // this is for passport authen
require('./routes')(app) // attach all the different endpoint to the apps


sequelize.sync() // sync sequelize with the server {force : true} = deleting all data
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}... let's start working...`)
  })
// full stack web App using Vue.js

    // const group = one.getGroup(102)
    // console.log(test.NAME)
    // const test = data.VM
    // console.log(Object.data)
    // for (var NAME in test) { //
    //   if (test.hasOwnProperty(NAME)) {
    //     console.log(NAME, test[NAME])
    //   }
    // }
      // const test = JSON.parse(data)
      // console.log(test.VM)

    // const user = one.getUser(14)
    // user.info(function(err, data) {
    //   console.log(data)
    // })
    // one.getHosts(function(err, data) {
    //   console.log(data)
    // })
    // one.getClusters(function(err, data) {
    //   console.log(data)
    // })
    // one.getGroups(function(err, data) {
    //   console.log(data)
    // })
    // one.getUsers(function(err, data) {
    //   console.log(data)
    // })
    // const vm = one.getVM(295)

    // vm.info(function(err, data) {
    //   console.log(date)
    // })
    // one.getVNets(function(err, data) {
    //   console.log(data)
    // }, null, 0, 100)
    // one.getVMs(function(err, data) {
    //   console.log(data)
    // }, null, 0, 0, null)
    // one.getTemplates(function(err, data) {
    //   console.log(data)
    // }, null, 0, 100)