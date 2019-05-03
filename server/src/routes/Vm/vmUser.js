const VmsVlabController = require('../../controllers/Vm/VmsVlabController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/vmsuser',
        isAuthenticated,
        MessagesUserController.index)
    app.post('/vmsuser',
        isAuthenticated,
        MessagesUserController.post)
    app.delete('/vmsuser/:vmUserId',
        isAuthenticated,
        MessagesUserController.delete)
}