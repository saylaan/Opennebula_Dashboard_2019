const UrlsUserController = require('../../controllers/Url/UrlsUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/users',
        isAuthenticated,
        UrlsUserController.index)
    // app.get('/users/:userId',
    //     isAuthenticated,
    //     UrlsUserController.getUser)
    // app.put('/users/:userId',
    //     UrlsUserController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     UrlsUserController.updateSetting)
    app.post('/users',
        isAuthenticated,
        UrlsUserController.post)
}