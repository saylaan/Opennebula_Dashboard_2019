const TemplatesVmController = require('../../controllers/Template/TemplatesVmController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/templatevms',
        isAuthenticated,
        TemplatesVmController.index)
    // app.get('/templatevms/:userId',
    //     isAuthenticated,
    //     TemplatesVmController.getUser)
    // app.put('/templatevms/:userId',
    //     TemplatesVmController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     TemplatesVmController.updateSetting)
    app.post('/templatevms',
        isAuthenticated,
        TemplatesVmController.post)
}