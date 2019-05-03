const MessagesUserController = require('../../controllers/Message/MessagesUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/messagesuser',
        isAuthenticated,
        MessagesUserController.index)
    app.post('/messagesuser',
        isAuthenticated,
        MessagesUserController.post)
    app.delete('/messagesuser/:messageUserId',
        isAuthenticated,
        MessagesUserController.delete)
    app.delete('/dashboard/:messageUserId',
        MessagesUserController.delAdmin)
}