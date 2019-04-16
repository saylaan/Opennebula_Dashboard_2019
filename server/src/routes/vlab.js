const VlabsController = require('../controllers/Vlab/VlabsController')
const VlabUsersController = require('../controllers/Vlab/VlabUsersController')
const VlabUserLogsController = require('../controllers/Vlab/VlabUserLogsController')
const isAuthenticated = require('../policies/isAuthenticated')

module.exports = (app) => {
  app.get('/vlabs',
  isAuthenticated,
  VlabsController.getAllVlabs)
  app.get('/vlabs/:vlabId',
  isAuthenticated,
  VlabsController.getVlab)
  app.put('/vlabs/:vlabId',
  isAuthenticated,
  VlabsController.put)
  app.post('/vlabs',
  isAuthenticated,
  VlabsController.post)

  app.get('/vlabUsers',
  isAuthenticated,
  VlabUsersController.getVlabUsers)
  app.post('/vlabUsers',
  isAuthenticated,
  VlabUsersController.post)
  app.delete(`/vlabUsers/:vlabuserId`,
  isAuthenticated,
  VlabUsersController.delete)

  app.get('/VlabUserLogs',
  isAuthenticated,
  VlabUserLogsController.index)
  app.post('/VlabUserLogs',
  isAuthenticated,
  VlabUserLogsController.post)
}
