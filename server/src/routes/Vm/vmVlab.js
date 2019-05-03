const VmsVlabController = require('../../controllers/Vm/VmsVlabController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/vmsvlab',
        isAuthenticated,
        MessagesUserController.index)
    app.post('/vmsvlab',
        isAuthenticated,
        MessagesUserController.post)
    app.delete('/vmsvlab/:vmVlabId',
        isAuthenticated,
        MessagesUserController.delete)
}