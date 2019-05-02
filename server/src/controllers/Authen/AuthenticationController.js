const { User } = require('../../models')
const jwt = require('jsonwebtoken') // for token authen
const config = require('../../config/config')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function jwtSignUser(user) { // Override the function who sign a user obj using jwt library to get back a token
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body)
      const tmpUser = user.toJSON()
      const hashCreate = bcrypt.hashSync(Math.floor((Math.random() * 99999999) * 54), null, null)  
      // user.password = user.hashPassword(user.password)
      user.active_hash = hashCreate
      const userJson = user.toJSON()
      console.log('hash', hashCreate)
      console.log('userJson', userJson)
      res.send({
        user: userJson,
        token: jwtSignUser(tmpUser)
      })
    } catch (err) {
      res.status(400).send({ // send type error
        error: 'This email account is already in use.'
      })
    }
  },
  async signin(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The password information was incorrect'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({ // send type error
        error: 'An error has occured trying to sign in'
      })
    }
  }

}
