const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    /* get / post / put / patch / delete */ // this for making the controller of data through the routes
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register),
    app.get('/status', (req, res) => {
      res.send({
        message: 'Hello my name is status'
      })
    })
}
