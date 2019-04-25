const VmsController = require('../../controllers/Vm/VmsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/vms',
        isAuthenticated,
        VmsController.index)
    // app.get('/vms/:userId',
    //     isAuthenticated,
    //     VmsController.getUser)
    // app.put('/vms/:userId',
    //     VmsController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     VmsController.updateSetting)
    app.post('/vms',
        isAuthenticated,
        VmsController.post)
}