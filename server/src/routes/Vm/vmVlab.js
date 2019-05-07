const VmsVlabController = require('../../controllers/Vm/VmsVlabController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/vmsvlab',
        isAuthenticated,
        VmsVlabController.index)
    app.post('/vmsvlab',
        isAuthenticated,
        VmsVlabController.post)
    app.delete('/vmsvlab/:vmVlabId',
        isAuthenticated,
        VmsVlabController.delete)
}