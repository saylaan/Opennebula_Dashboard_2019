const VlabsController = require('../../controllers/Vlab/VlabsController')
const isAuthenticated = require('../../policies/isAuthenticated')

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
}
