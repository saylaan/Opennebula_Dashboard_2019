const {
  Template,
  TemplateVm
} = require('../../models')
const _ = require('lodash')

module.exports = {
  async index(req, res) {
    try { // TODO : LOOK BACK THIS ONE MAY HAVE LOT OF CHANGE
      const TemplateId = req.template.id
      const templateVms = await TemplateVm.findAll({
        where: {
          TemplateId: TemplateId
        },
        include: [
          {
            model: Template
          }
        ]
      })
        .map(templateVm => templateVm.toJSON())
        .map(templateVm => _.extend(
          {},
          templateVm.Template,
          templateVm
        ))
      res.send(_.uniqBy(templateVms, templateVm => templateVm.VlabId))
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Template User'
      })
    }
  },
  async post(req, res) {
    try { // TODO : get vmId and TemplateId
      const VmId = req.vm.id
      const { TemplateId } = req.body
      const templateVm = await TemplateVm.create({
        TemplateId: TemplateId,
        VmId: VmId
      })
      res.send(templateVm)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to create the template for the vm'
      })
    }
  }
}