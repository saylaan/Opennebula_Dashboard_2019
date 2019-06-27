const express = require('express')
const bodyParser = require('body-parser') // process json data
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config')
const openneb = require('../opennebula/openneb')
const dbopenneb = require('../opennebula/dbopenneb')
const cookieSession = require('cookie-session')
const LocalStrategy = require('passport-local').Strategy
const https = require('https')
const fs = require('fs')

const imports = {
  express: express,
  bodyParser: bodyParser,
  cors: cors,
  morgan: morgan,
  config: config,
  openneb: openneb,
  dbopenneb: dbopenneb,
  cookieSession: cookieSession,
  LocalStrategy: LocalStrategy,
  https: https,
  fs: fs
}

module.exports = imports