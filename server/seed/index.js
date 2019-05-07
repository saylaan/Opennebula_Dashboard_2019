const {
  sequelize,
  User,
  Vlab,
  VlabUser,
  VlabUserLog,
  Message,
  MessageUser,
  Url,
  UrlUser,
  UrlVlab,
  Vm,
  VmUser,
  VmVlab,
  TemplateVm,
  Template
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
const urlsVlabs = require('./Url/urlsVlabs.json')

const vms = require('./Vm/vms.json')
const vmsUsers = require('./Vm/vmsUsers.json')
const vmsVlabs = require('./Vm/vmsVlabs.json')

sequelize.sync({force: true})
  .then(async function () {

    /* ####################################################################### */
    /* USER */
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

/* ####################################################################### */
    /* VLAB */
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

/* ####################################################################### */
    /* MESSAGE */
    await Promise.all(
      messages.map(message => {
        Message.create(message)
      })
    )
    await Promise.all(
      messagesUsers.map(messagesUser => {
        MessageUser.create(messagesUser)
      })
      )

/* ####################################################################### */
    /* URL */
    await Promise.all(
      urls.map(url => {
        Url.create(url)
      })
    )
    await Promise.all(
      urlsUsers.map(urlsUser => {
        UrlUser.create(urlsUser)
      })
    )
    await Promise.all(
      urlsVlabs.map(urlsVlab => {
        UrlVlab.create(urlsVlab)
      })
      )
      
/* ####################################################################### */
    /* VM */
    await Promise.all(
      vms.map(vm => {
        Vm.create(vm)
      })
    )
    await Promise.all(
      vmsUsers.map(vmUser => {
        VmUser.create(vmUser)
      })
    )
    await Promise.all(
      vmsVlabs.map(vmVlab => {
        VmVlab.create(vmVlab)
      })
    )

/* ####################################################################### */
    /* TEMPLATE */
    await Promise.all(
      templates.map(template => {
        Template.create(template)
      })
    )
    await Promise.all(
      templatesVms.map(templatesVm => {
        TemplateVm.create(templatesVm)
      })
    )
  })