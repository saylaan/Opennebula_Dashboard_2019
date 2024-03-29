const UrlsController = require('../../controllers/Url/UrlsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/url',
        isAuthenticated,
        UrlsController.index)
    app.get('/url/:urlId',
        isAuthenticated,
        UrlsController.getUrl)
    app.put('/url/:urlId',
        UrlsController.put)
    app.delete('/url/:urlId',
        isAuthenticated,
        UrlsController.delete)
    app.post('/url',
        isAuthenticated,
        UrlsController.post)
    app.put('/vlab/:urlId',
        isAuthenticated,
        UrlsController.changePwd)
}