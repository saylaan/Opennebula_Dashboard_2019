const UrlsController = require('../../controllers/Url/UrlsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        UrlsController.index)
    // app.get('/users/:userId',
    //     isAuthenticated,
    //     UrlsController.getUser)
    // app.put('/users/:userId',
    //     UrlsController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     UrlsController.updateSetting)
    app.post('/users',
        isAuthenticated,
        UrlsController.post)
}