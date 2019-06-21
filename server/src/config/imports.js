const express = require('express')
const bodyParser = require('body-parser') // process json data
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
const openneb = require('../opennebula/openneb')
const dbopenneb = require('../opennebula/dbopenneb')

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