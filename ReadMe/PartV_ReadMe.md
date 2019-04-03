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

Actually the windows is always in a v-layout (inside you can cut with xs6 for a total of xs12)
For making margin between them use "class="ml-2""

For making a textarea read from the db just use <texxarea readonly v-model="name.obj"></textarea>
-> v-model can work like that too (made for data).
For making more then one v-layout into a component, just put every layout in a div.

It's really important to manage to do a clean folder to put each component together and use the importation of different panel view. The transfer of data is manage by "props" who give the opportunity to have a path reading of data and just one data and not all. (be caution of the case and to put each style scope in the proper components.
import VlabData from './VlabData'
+ add in component
+ add the new tag <vlab-data :vlab="vlab"
+ add into the props of the component : "vlab"

For adding a video Youtube, you need to import VueYouEmbed from 'vue-youtube-embed' (look on internet if need) and then Vue.use(...) into the main.js
Some alt : :player-width="" :player-height=""
