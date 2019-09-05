const passport = require('passport')

module.exports = async function (req, res, next) {
    await passport.authenticate('jwt', async function (err, user) {
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
