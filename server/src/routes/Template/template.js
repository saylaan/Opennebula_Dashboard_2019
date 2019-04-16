const TemplatesController = require('../../controllers/Template/TemplatesController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        TemplatesController.index)
    // app.get('/users/:userId',
    //     isAuthenticated,
    //     TemplatesController.getUser)
    // app.put('/users/:userId',
    //     TemplatesController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     TemplatesController.updateSetting)
    app.post('/users',
        isAuthenticated,
        TemplatesController.post)
}