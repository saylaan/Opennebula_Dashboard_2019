const UsersController = require('../../controllers/User/UsersController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
  app.get('/users',
    isAuthenticated,
    UsersController.index)
  app.get('/users/:userId',
    isAuthenticated,
    UsersController.getUser)
  app.put('/users/:userId',
    UsersController.put)
  app.put('/settings/:userId',
    isAuthenticated,
    UsersController.updateSetting)
  app.post('/users',
    isAuthenticated,
    UsersController.post)
  app.delete('/users/:userId',
    isAuthenticated,
    UsersController.delete)
}
