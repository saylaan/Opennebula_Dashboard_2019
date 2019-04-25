const {
  sequelize,
  Vlab,
  User,
  VlabUser,
  VlabUserLog,
  Message,
  Template,
  Url,
  Vm,
  MessageUser,
  TemplateVm,
  UrlUser,
  VmVlab
} = require('../src/models')

const Promise = require('bluebird')
const vlabs = require('./Vlab/vlabs.json')
const vlabUserLogs = require('./Vlab/vlabUserLogs.json')
const vlabUsers = require('./Vlab/vlabUsers.json')

const users = require('./User/users.json')

const messages = require('./Message/messages.json')
const messagesUsers = require('./Message/messagesUsers.json')

const templates = require('./Template/templates.json')
const templatesVms = require('./Template/templatesVms.json')

const urls = require('./Url/urls.json')
const urlsUsers = require('./Url/urlsUsers.json')

const vms = require('./Vm/vms.json')
const vmsVlabs = require('./Vm/vmsVlabs.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      vlabs.map(vlab => {
        Vlab.create(vlab)
      })
    )

    await Promise.all(
      vlabUsers.map(vlabUser => {
        VlabUser.create(vlabUser)
      })
    )

    await Promise.all(
      vlabUserLogs.map(vlabUserLog => {
        VlabUserLog.create(vlabUserLog)
      })
    )

    await Promise.all(
      messages.map(message => {
        Message.create(message)
      })
    )

    await Promise.all(
      templates.map(template => {
        Template.create(template)
      })
    )

    await Promise.all(
      urls.map(url => {
        Url.create(url)
      })
    )

    await Promise.all(
      vms.map(vm => {
        Vm.create(vm)
      })
    )

    await Promise.all(
      messagesUsers.map(messagesUser => {
        MessageUser.create(messagesUser)
      })
    )

    await Promise.all(
      templatesVms.map(templatesVm => {
        TemplateVm.create(templatesVm)
      })
    )

    await Promise.all(
      urlsUsers.map(urlsUser => {
        UrlUser.create(urlsUser)
      })
    )

    await Promise.all(
      vmsVlabs.map(vmVlab => {
        VmVlab.create(vmVlab)
      })
    )
  })