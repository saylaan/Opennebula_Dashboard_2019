const VmsController = require('../../controllers/Vm/VmsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/vm',
        isAuthenticated,
        UrlsController.index)
    app.get('/vm/:vmId',
        isAuthenticated,
        UrlsController.getVm)
    app.put('/vm/:vmId',
        UrlsController.put)
    app.delete('/vm/:vmId',
        isAuthenticated,
        UrlsController.delete)
    app.post('/vm',
        isAuthenticated,
        UrlsController.post)
}