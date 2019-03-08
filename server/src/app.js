console.log('Server working...')

/* Import package */
const express = require('express')
const bodyParser = require('body-parser') // process json data
const cors = require('cors')
const morgan = require('morgan')

/* build an express app */
const app = express()
/* enable packages */
app.use(morgan('combined')) // morgan doc -> print out log;
app.use(bodyParser.json())
app.use(cors()) // server hosted on different depend --> CARE (need good security)

/* get / post / put / patch / delete */
app.get('/status', (req, res) => {
  res.send({
    message : 'hello world'
  })
})

app.listen(process.env.PORT || 8081)


// full stack web App using Vue.js
