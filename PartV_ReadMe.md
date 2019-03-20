# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs

VueDevTools is a very important plugin while you can keep in track of vuex / events / components of the web page

**Make a particular view for a Vlab in vlabs with id/title/...
1. For the Front
-add a method mounted () with a method in the particular Service (don't forget to import the services into the filename.vue)
import VlabService from '@/services/VlabService'

export default {
  data () {
    return {
      vlab: null
    }
  },
  async mounted () {
    const vlabTitle = this.$store.state.route.params.vlabTitle
    this.vlab = (await VlabService.getVlab(vlabId)).data // do not forget '.data'
  }
}
-add the show method in the Service for the get request on the API
show (vlabTitle) {
  return Api().get(`vlabs/${vlabTitle}`)
}
2. For the Back
-add the get request for show
app.get('/vlabs/:vlabTitle',
    VlabsController.getVlab)
-add the getVlab in the VlabsController
If you got an id do :
try {
  const ... = await ...findByPk(req.params...)
  res.send(...)
} error...
Or with a certain text :
try {
  const title = req.params.vlabTitle
  const vlab = await Vlab.findOne({
    where: {
      title: title
    }
  })
  if (!vlab) {
    return res.status(403).send({
      error: 'The vlab does not exist'
    })
  }
  res.send(vlab)
Note : There is always an ID
--> now we get the data Back
3. Let make it visible in the Front
-add the components we need (like panel)
