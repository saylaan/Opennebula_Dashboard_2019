const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    /* get / post / put / patch / delete */
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    // app.get('/status', (req, res) => {
    //   res.send({
    //     message: 'Hello my name is status'
    //   })
    // })
}
