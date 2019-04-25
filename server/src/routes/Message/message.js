const MessageController = require('../../controllers/Message/MessagesController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/messages',
        isAuthenticated,
        MessageController.index)
    // app.get('/messages/:userId',
    //     isAuthenticated,
    //     MessageController.getUser)
    // app.put('/messages/:userId',
    //     MessageController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     MessageController.updateSetting)
    app.post('/messages',
        isAuthenticated,
        MessageController.post)
}