const UrlsUserController = require('../../controllers/Url/UrlsUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/urlsvlab',
        isAuthenticated,
        MessagesUserController.index)
    app.post('/urlsvlab',
        isAuthenticated,
        MessagesUserController.post)
    app.delete('/urlsvlab/:urlVlabId',
        isAuthenticated,
        MessagesUserController.delete)
}