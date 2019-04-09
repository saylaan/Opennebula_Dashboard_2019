const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

const UsersController = require('./controllers/UsersController')

const VlabsController = require('./controllers/VlabsController')
const VlabUsersController = require('./controllers/VlabUsersController')
const VlabUserLogsController = require('./controllers/VlabUserLogsController')

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

    app.get('/users',
        UsersController.index)

    app.get('/vlabs',
        VlabsController.getAllVlabs)
    app.get('/vlabs/:vlabId',
        VlabsController.getVlab)
    app.put('/vlabs/:vlabId',
        VlabsController.put)
    app.post('/vlabs',
        VlabsController.post)

    app.get('/vlabUsers',
        isAuthenticated,
        VlabUsersController.getVlabUsers)
    app.post('/vlabUsers',
        isAuthenticated,
        VlabUsersController.post)
    app.delete(`/vlabUsers/:vlabuserId`,
        isAuthenticated,
        VlabUsersController.delete)

    app.get('/VlabUserLogs',
        isAuthenticated,
        VlabUserLogsController.index)
    app.post('/VlabUserLogs',
        isAuthenticated,
        VlabUserLogsController.post)
}
