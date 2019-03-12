console.log('Server working...')

/* Import package */
const express = require('express')
const bodyParser = require('body-parser') // process json data
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models') // models folder with index.js file who return a sequelize obj
const config = require('./config/config')

/* build an express app */
const app = express()
/* enable packages */
app.use(morgan('combined')) // morgan doc -> print out log;
app.use(bodyParser.json())
app.use(cors()) // server hosted on different depend --> CARE (need good security)

require('./routes')(app) // attach all the different endpoint to the apps

sequelize.sync() // sync sequelize with the server
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}... let's start working...`)
  })


// full stack web App using Vue.js
