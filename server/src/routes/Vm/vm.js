const VmsController = require('../../controllers/Vm/VmsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/vm',
        isAuthenticated,
        VmsController.index)
    app.get('/vm/:vmId',
        isAuthenticated,
        VmsController.getVm)
    app.put('/vm/:vmId',
        VmsController.put)
    app.delete('/vm/:vmId',
        isAuthenticated,
        VmsController.delete)
    app.post('/vm',
        isAuthenticated,
        VmsController.post)
}