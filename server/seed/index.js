const {
  sequelize,
  User,
  Vlab,
  VlabUser,
  VlabUserLog,
  Message,
  MessageUser,
  Resp,
  RespMessage,
  Url,
  UrlUser,
  UrlVlab,
  Vm,
  VmUser,
  VmVlab,
  TemplateVm,
  Template,
  Sip,
  SipUser,
  SipVlab
} = require('../src/models')

const Promise = require('bluebird')
const vlabs = require('./Vlab/vlabs.json')
const vlabUserLogs = require('./Vlab/vlabUserLogs.json')
const vlabUsers = require('./Vlab/vlabUsers.json')

const users = require('./User/users.json')

const messages = require('./Message/messages.json')
const messagesUsers = require('./Message/messagesUsers.json')
const resps = require('./Message/resps.json')
const respsMessages = require('./Message/respsMessage.json')

const templates = require('./Template/templates.json')
const templatesVms = require('./Template/templatesVms.json')

const urls = require('./Url/urls.json')
const urlsUsers = require('./Url/urlsUsers.json')
const urlsVlabs = require('./Url/urlsVlabs.json')

const vms = require('./Vm/vms.json')
const vmsUsers = require('./Vm/vmsUsers.json')
const vmsVlabs = require('./Vm/vmsVlabs.json')

const sips = require('./Sip/sips.json')
const sipsUsers = require('./Sip/sipsUsers.json')
const sipsVlabs = require('./Sip/sipsVlabs.json')

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
    /* RESP */
    await Promise.all(
      resps.map(resp => {
        Resp.create(resp)
      })
    )
    await Promise.all(
      respsMessages.map(respsMessage => {
        RespMessage.create(respsMessage)
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
    /* SIP */
    await Promise.all(
      sips.map(sip => {
        Sip.create(sip)
      })
    )
    await Promise.all(
      sipsUsers.map(sipsUser => {
        SipUser.create(sipsUser)
      })
    )
    await Promise.all(
      sipsVlabs.map(sipsVlab => {
        SipVlab.create(sipsVlab)
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