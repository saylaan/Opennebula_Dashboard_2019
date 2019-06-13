const express = require('express')
const bodyParser = require('body-parser') // process json data
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const openneb = require('./openneb')
const dbopenneb = require('./dbopenneb')

const imports = {
  express: express,
  bodyParser: bodyParser,
  cors: cors,
  morgan: morgan,
  config: config,
  openneb: openneb,
  dbopenneb: dbopenneb
}

module.exports = imports