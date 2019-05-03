const MessageController = require('../../controllers/Message/MessagesController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/dashboard',
        isAuthenticated,
        MessageController.index)
    app.get('/message/:messageId',
        isAuthenticated,
        MessageController.getMessage)
    app.post('/message/:messageId',
        isAuthenticated,
        MessageController.post)
    app.post('/message',
        MessageController.postNewMsg)
    app.delete('/message/:messageId',
        isAuthenticated,
        MessageController.delete)
    app.delete('/dashboard',
        isAuthenticated,
        MessageController.deleteBis)
}