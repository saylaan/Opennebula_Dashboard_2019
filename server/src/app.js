console.log('Server working...')

/* Import package */
const express = require('express')
const bodyParser = require('body-parser') // process json data
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')

/* build an express app */
const app = express()
/* enable packages */
app.use(morgan('combined')) // morgan doc -> print out log;
app.use(bodyParser.json())
app.use(cors()) // server hosted on different depend --> CARE (need good security)

/* get / post / put / patch / delete */
app.post('/register', (req, res) => {
  res.send({
    message : `Hello ${req.body.email}! Your user was registered! Have fun!`
  })
})

app.get('/status', (req, res) => {
  res.send({
    message: 'Hello my name is status'
  })
})

sequilize.sync()
  .then(() => {
    app.listen(process.env.PORT || 8081)
    console.log('Server started on port $(config;port}')
  })


// full stack web App using Vue.js
