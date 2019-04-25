const UrlsController = require('../../controllers/Url/UrlsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/urls',
        isAuthenticated,
        UrlsController.index)
    // app.get('/urls/:userId',
    //     isAuthenticated,
    //     UrlsController.getUser)
    // app.put('/urls/:userId',
    //     UrlsController.put)
    // app.put('/settings/:userId',
    //     isAuthenticated,
    //     UrlsController.updateSetting)
    app.post('/urls',
        isAuthenticated,
        UrlsController.post)
}