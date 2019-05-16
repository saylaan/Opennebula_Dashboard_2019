const SipsUserController = require('../../controllers/Sip/SipsUserController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/sipsuser',
        isAuthenticated,
        SipsUserController.index)
    app.post('/sipsuser',
        isAuthenticated,
        SipsUserController.post)
    app.delete('/sipsuser/:sipUserId',
        isAuthenticated,
        SipsUserController.delete)
}