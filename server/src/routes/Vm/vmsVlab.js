const VmsVlabController = require('../../controllers/Vm/VmsVlabController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/vmvlabs',
        isAuthenticated,
        VmsVlabController.index)
    // app.get('/vmvlabs/:userId',
    //     isAuthenticated,
    //     VmsVlabController.getUser)
    // app.put('/vmvlabs/:userId',
    //     VmsVlabController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     VmsVlabController.updateSetting)
    app.post('/vmvlabs',
        isAuthenticated,
        VmsVlabController.post)
}