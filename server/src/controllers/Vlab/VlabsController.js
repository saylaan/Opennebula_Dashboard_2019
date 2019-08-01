const { Vlab,
  UserOpenNebula,
  Vm,
  VmVlab,
  VmUser,
  VlabUser } = require('../../models')
const openneb = require('../../opennebula/openneb')
const datetime = require('date-and-time')

module.exports = {
  async getAllVlabs(req, res) {
    try {
      let vlabs = null
      const search = req.query.search
      if (search) {
        vlabs = await Vlab.findAll({
          where: {
            title: search 
            // TODO : FIX ME FOR MULTIPLE RESEARCH IN NODEJS
            // $or: [
            //   'title', 'name', 'time', 'vlabImage'
            // ]: search
            // .map(key => ({
            //   [key]: search
            //   // {
            //   //   $like: `%${search}%`
            //   // }
            // }))
          }
        })
      } else {
        vlabs = await Vlab.findAll({
          limit: 100
        })
      }
      res.send(vlabs)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to fetch all the Vlab'
      })
    }
  },
  async post(req, res) {
    try {
      const vlab = await Vlab.create(req.body)
      res.send(vlab)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured while trying to create a new Vlab'
      })
    }
  },
  async getVlab(req, res) {
    try {
      const vlab = await Vlab.findAll({
        where: {
          id: req.params.vlabId
        }
      })
      if (!vlab) {
        return res.status(403).send({
          error: 'The vlab does not exist'
        })
      }
      res.send(vlab)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to get the Vlab'
      })
    }
  },
  async put(req, res) {
    try {
      if (req.body.dayleft !== 0) {
        var date = new Date()
        var endlicence = date.getTime()
        var datestart = new Date(endlicence)
        var months = datestart.getMonth() + 1
        if (parseInt(months, 10) < 10) {
          months = "0" + months
        }
        var days = datestart.getDate()
        if (parseInt(days, 10) < 10) {
          days = "0" + days
        }
        var startlicence = datestart.getFullYear() + "-" + months + "-" + days
        var day = parseInt(req.body.dayleft, 10) * 24 * 60 * 60 * 1000
        endlicence = endlicence + day
        var newdate = new Date(endlicence)
        months = newdate.getMonth() + 1
        if (parseInt(months, 10) < 10) {
          months = "0" + months
        }
        days = newdate.getDate()
        if (parseInt(days, 10) < 10) {
          days = "0" + days
        }
        endlicence = newdate.getFullYear() + "-" + months + "-" + days
        req.body.startlicence = startlicence
        req.body.endlicence = endlicence
      } else {
        req.body.startlicence = "XX/XX/XX"
        req.body.endlicence = "XX/XX/XX"
      }
      const vlab = await Vlab.update(req.body, {
        where: {
          id: req.params.vlabId
        }
      })
      const vlabuser = await VlabUser.findOne({
        where: {
          VlabId: req.params.vlabId
        }
      })
      if (!vlabuser) {
        const UserOn = await UserOpenNebula.findAll();
        const vmsvlab = await VmVlab.findAll({
          where: {
            VlabId: req.params.vlabId
          }
        })
        vmsvlab.forEach(async vmvlab => {
          const vm = await Vm.findOne({
            where: {
              id: vmvlab.VmId
            }
          })
          if (vm.type.indexOf('_') === -1) {
            const vmon = await openneb.one.getVM(vm.idopennebula)
            UserOn.forEach(async useron => {
              if (useron.username === req.body.ownername) {
                console.log('Is EXISTING IN DB')
                const newVm = {
                  idopennebula: vm.idopennebula,
                  ownername: useron.username,
                  groupname: vm.groupname,
                  name: vm.name,
                  type: vm.type,
                  active: vm.active
                }
                await Vm.update(newVm, {
                  where: {
                    id: vm.id
                  }
                })
                await vmon.chown(useron.idopennebula, (err, data) => {
                  console.log("Changing user on opennebula done")
                  console.log(data)
                })
              }
            })
          }
        })
      }
      res.send(vlab)
    } catch (err) {
      res.status(500).send({
        err: 'An error has occured while trying to update the vlab'
      })
    }
  }
}
