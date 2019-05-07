const VmsUserController = require('../../controllers/Vm/VmsUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/vmsuser',
        isAuthenticated,
        VmsUserController.index)
    app.post('/vmsuser',
        isAuthenticated,
        VmsUserController.post)
    app.delete('/vmsuser/:vmUserId',
        isAuthenticated,
        VmsUserController.delete)
}