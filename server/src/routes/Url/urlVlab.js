const UrlsVlabController = require('../../controllers/Url/UrlsVlabController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/urlsvlab',
        isAuthenticated,
        UrlsVlabController.index)
    app.post('/urlsvlab',
        isAuthenticated,
        UrlsVlabController.post)
    app.delete('/urlsvlab/:urlVlabId',
        isAuthenticated,
        UrlsVlabController.delete)
}