const MessageController = require('../../controllers/Message/MessagesController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        MessageController.index)
    // app.get('/users/:userId',
    //     isAuthenticated,
    //     MessageController.getUser)
    // app.put('/users/:userId',
    //     MessageController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     MessageController.updateSetting)
    app.post('/users',
        isAuthenticated,
        MessageController.post)
}