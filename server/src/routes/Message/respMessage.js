const RespsMessageController = require('../../controllers/Message/RespsMessageController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/respsmessage',
        isAuthenticated,
        RespsMessageController.index)
    app.post('/respsmessage',
        isAuthenticated,
        RespsMessageController.post)
    app.delete('/respsmessage/:respMessageId',
        isAuthenticated,
        RespsMessageController.delete)
}