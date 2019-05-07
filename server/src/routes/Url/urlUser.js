const UrlsUserController = require('../../controllers/Url/UrlsUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/urlsuser',
        isAuthenticated,
        UrlsUserController.index)
    app.post('/urlsuser',
        isAuthenticated,
        UrlsUserController.post)
    app.delete('/urlsuser/:urlUserId',
        isAuthenticated,
        UrlsUserController.delete)
}