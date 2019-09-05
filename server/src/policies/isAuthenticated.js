const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', async function (err, user) {
    console.log('user', user)
    console.log('user', user)
    console.log('user', user)
    console.log('user', user)
    await setTimeout(async (err, data) => {
      if (err || !user) {
        res.status(403).send({
          error: 'you do not have access to this resource'
        })
      } else {
        req.user = user
        next()
      }
    }, 1000)
  })(req, res, next)
}
