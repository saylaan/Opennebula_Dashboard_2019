const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      console.log('error', err)
      console.log('error', err)
      console.log('user', user)
      console.log('user', user)
      res.status(403).send({
        error: 'you do not have access to this resource'
      })
    } else {
      console.log('user', user)
      console.log('user', user)
      console.log('user', user)
      req.user = user
      next()
    }
  })(req, res, next)
}
