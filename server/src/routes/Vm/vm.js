const VmsController = require('../../controllers/Vm/VmsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        VmsController.index)
    // app.get('/users/:userId',
    //     isAuthenticated,
    //     VmsController.getUser)
    // app.put('/users/:userId',
    //     VmsController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     VmsController.updateSetting)
    app.post('/users',
        isAuthenticated,
        VmsController.post)
}