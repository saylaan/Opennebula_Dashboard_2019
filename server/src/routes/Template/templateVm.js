const TemplatesVmController = require('../../controllers/Template/TemplatesVmController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        TemplatesVmController.index)
    // app.get('/users/:userId',
    //     isAuthenticated,
    //     TemplatesVmController.getUser)
    // app.put('/users/:userId',
    //     TemplatesVmController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     TemplatesVmController.updateSetting)
    app.post('/users',
        isAuthenticated,
        TemplatesVmController.post)
}