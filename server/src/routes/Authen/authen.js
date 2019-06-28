const AuthenticationController = require('../../controllers/Authen/AuthenticationController')
const AuthenticationControllerPolicy = require('../../policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    /* get / post / put / patch / delete */ // this for making the controller of data through the routes
    // app.get('/status', (req, res) => { // Just a testing method for see if back-end works well
    //   res.send({
    //     message: 'Hello my name is status'
    //   })
    // })
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/signin',
        AuthenticationController.signin)
}
