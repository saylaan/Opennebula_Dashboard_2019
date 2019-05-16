const SipsController = require('../../controllers/Sip/SipsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/sip',
        isAuthenticated,
        SipsController.index)
    app.get('/sip/:sipId',
        isAuthenticated,
        SipsController.getSip)
    app.put('/sip/:sipId',
        SipsController.put)
    app.delete('/sip/:sipId',
        isAuthenticated,
        SipsController.delete)
    app.post('/sip',
        isAuthenticated,
        SipsController.post)
}