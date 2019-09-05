const passport = require('passport')

module.exports = async function (req, res, next) {
  await setTimeout((err, data) => {
    console.log('Time out before authenticated....')
  }, 1000)
  await passport.authenticate('jwt', async function (err, user) {
    console.log('user', user)
    if (err || !user) {
      res.status(403).send({
        error: 'you do not have access to this resource'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
