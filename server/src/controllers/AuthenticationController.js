const {User} = require('../models')

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({ // send type error
                error: 'This email account is already in use.'
            })
        }
    }
    /* only for testing the response on Postman */
    //register (req, res) { // express endpoint / middleware
    // res.send({
      //   message : `Hello ${req.body.email}! Your user was registered! Have fun!`
      // })
    //}
}
