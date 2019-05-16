const SipsVlabController = require('../../controllers/Sip/SipsVlabController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/sipsvlab',
        isAuthenticated,
        SipsVlabController.index)
    app.post('/sipsvlab',
        isAuthenticated,
        SipsVlabController.post)
    app.delete('/sipsvlab/:sipVlabId',
        isAuthenticated,
        SipsVlabController.delete)
}