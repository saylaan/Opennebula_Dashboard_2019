const { User } = require('../../models')
const jwt = require('jsonwebtoken') // for token authen
const config = require('../../config/config')
const Promise = require('bluebird')
const bcrypt = require('bcrypt')

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
      const userJson = user.toJSON()
      let hashPwd
      bcrypt.hash(userJson.password, 10, (err, hash) => {
        hashPwd = hash
      })
      console.log(hashPwd)
      console.log(hashPwd)
      console.log(hashPwd)
      console.log(hashPwd)
      console.log(hashPwd)
      console.log(hashPwd)
      console.log(hashPwd)
      console.log(hashPwd)
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
