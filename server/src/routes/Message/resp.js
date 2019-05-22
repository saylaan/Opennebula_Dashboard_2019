const RespController = require('../../controllers/Message/RespsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
    app.get('/resp',
        isAuthenticated,
        RespController.index)
    app.get('/resp/:respId',
        isAuthenticated,
        RespController.get)
    app.post('/resp',
        isAuthenticated,
        RespController.post)
    app.delete('/resp/:respId',
        isAuthenticated,
        RespController.delete)
}