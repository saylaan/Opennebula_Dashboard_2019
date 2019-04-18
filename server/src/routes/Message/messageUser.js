const MessagesUserController = require('../../controllers/Message/MessagesUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/messagesuser',
        isAuthenticated,
        MessagesUserController.index)
    // app.get('/messagesusers/:userId',
    //     isAuthenticated,
    //     MessagesUserController.getUser)
    // app.put('/messagesusers/:userId',
    //     MessagesUserController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     MessagesUserController.updateSetting)
    app.post('/messagesuser',
        isAuthenticated,
        MessagesUserController.post)
}