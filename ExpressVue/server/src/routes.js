const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

const VlabsController = require('./controllers/VlabsController')

const VlabUsersController = require ('./controllers/VlabUsersController')

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

    app.get('/vlabs',
        VlabsController.getAllVlabs)
    app.get('/vlabs/:vlabId',
        VlabsController.getVlab)
    app.put('/vlabs/:vlabId',
        VlabsController.put)
    app.post('/vlabs',
        VlabsController.post)

    app.get('/vlabUsers',
        VlabUsersController.getVlabUsers)
    app.post('/vlabUsers',
        VlabUsersController.post)
    app.delete(`/vlabUsers/:vlabuserId`, 
        VlabUsersController.delete)
}
