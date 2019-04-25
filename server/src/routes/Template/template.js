const TemplatesController = require('../../controllers/Template/TemplatesController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/templates',
        isAuthenticated,
        TemplatesController.index)
    // app.get('/templates/:userId',
    //     isAuthenticated,
    //     TemplatesController.getUser)
    // app.put('/templates/:userId',
    //     TemplatesController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     TemplatesController.updateSetting)
    app.post('/templates',
        isAuthenticated,
        TemplatesController.post)
}