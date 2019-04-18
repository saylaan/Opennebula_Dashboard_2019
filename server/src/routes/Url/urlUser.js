const UrlsUserController = require('../../controllers/Url/UrlsUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/urlusers',
        isAuthenticated,
        UrlsUserController.index)
    // app.get('/urlusers/:userId',
    //     isAuthenticated,
    //     UrlsUserController.getUser)
    // app.put('/urlusers/:userId',
    //     UrlsUserController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     UrlsUserController.updateSetting)
    app.post('/urlusers',
        isAuthenticated,
        UrlsUserController.post)
}