const MessagesUserController = require('../../controllers/Message/MessagesUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        MessagesUserController.index)
    // app.get('/users/:userId',
    //     isAuthenticated,
    //     MessagesUserController.getUser)
    // app.put('/users/:userId',
    //     MessagesUserController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     MessagesUserController.updateSetting)
    app.post('/users',
        isAuthenticated,
        MessagesUserController.post)
}