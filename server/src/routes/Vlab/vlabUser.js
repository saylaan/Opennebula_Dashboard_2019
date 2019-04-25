const VlabUsersController = require('../../controllers/Vlab/VlabUsersController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
  app.get('/vlabUsers',
  isAuthenticated,
  VlabUsersController.getVlabUsers)
  app.post('/vlabUsers',
  isAuthenticated,
  VlabUsersController.post)
  app.delete(`/vlabUsers/:vlabuserId`,
  isAuthenticated,
  VlabUsersController.delete)
}
