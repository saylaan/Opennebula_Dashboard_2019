const VlabUserLogsController = require('../../controllers/Vlab/VlabUserLogsController')
const isAuthenticated = require('../../policies/isAuthenticated')

module.exports = (app) => {
  app.get('/VlabUserLogs',
  isAuthenticated,
  VlabUserLogsController.index)
  app.post('/VlabUserLogs',
  isAuthenticated,
  VlabUserLogsController.post)
}
