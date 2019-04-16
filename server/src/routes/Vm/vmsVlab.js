const VmsVlabController = require('../../controllers/Vm/VmsVlabController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        VmsVlabController.index)
    // app.get('/users/:userId',
    //     isAuthenticated,
    //     VmsVlabController.getUser)
    // app.put('/users/:userId',
    //     VmsVlabController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     VmsVlabController.updateSetting)
    app.post('/users',
        isAuthenticated,
        VmsVlabController.post)
}