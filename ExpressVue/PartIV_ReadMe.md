# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs

For having a logout button hide :
-make a new btn just beside the btn signin and put !$store.state.isUserLoggedIn
-add a method on click for setting :
this.$store.dispatch('setToken', null)
this.$store.dispatch('setUser', null)

Handling different window and page.
We can make a new window without making a new router.
-Actually we can import into the script of the window, the new window such as a "Panel" for example.
-And by adding a new components section with the import window. (like the "Header").
-Next we only need to add the new tag <panel />
Care, there is a certain type of writing for component as tag.
MyAwesomePanel = my-awesome-panel or Panel = panel

If we had a {{}}. We can use this with data() = sending data through differents page. (like twig in symfony)
v-for="vlab in vlabs" = forEach in Vue
for img  -> <img class="album-image" :src="vlab.vlabImage" />
data () {
  return {
    vlabs: [
      {
        title: 'Vlab 1',
        name: 'Name 1',
        time: 'time 1'
      },
      {
        title: 'Vlab 2',
        name: 'Name 2',
        time: 'time 2'
      },
      {
        title: 'Vlab 3',
        name: 'Name 3',
        time: 'time 3'
      }
    ]
we can order by a certain key with :key="song.title"
--> Very nice but not a DB
++ lets see now with the backend :
- add a new function mounted() {}
  async mounted () { // request to the DB
    this.vlabs = (await VlabService.getAllVlabs()).data (ça doit être le meme nom que dans data())
  }
- create the new service in /services
- add a get request into it such as :
getAllVlabs(or "index") () {
  return Api().get('vlabs')
}
show ()

/vlabs
/vlabs/:id
++change the backend for making the get request:
-add a new route in the routes.js with his new controller
-add a new controller for it
-add a new models for getting the data of the DB (Il faut faire attention aux différents donneés que nous voulons en fonction de leur stockage dans la db). Il faut utiliser la fonction findAll()
(for example go look at the models/vlab)

++make a post request for the vlab with some checking placeholde:
-make a new vue for createVlab /vlab/create
-add the default template + add the data in <script> such as in server/models/vlab and set it to null
-add the post request in the client/services/VlabService
post (vlab) {
  return Api().post('vlabs', vlab)
}
-import the panel in the CreateVlab.vue
-add v-text-field for all the attribut we need and the v-flex + v-layout for the format we want
-add the v-btn and the @click for the method to call and import the right service
-make the method proper with error handling
async create (route) {
  try {
    await VlabService.post(this.vlab)
    this.$router.push(route)
  } catch (err) {
    console.log(err)
  }
}
-do the redirection to the vlab page after
-make a v-btn for the vlab for going to creation (alt "fab" give a circle btn)
(--> It possible to make a specific floating btn with add a slot=".." at the <router-link and giving alt to the v-btn:  medium absolute right middle. And making the <slot name=".."/>
in the panel (We only see the btn in vlab) or we can make and slot alt and a @click in the v-btn)
-we can add :rules="[rules.required]" to each placeholder and adding a new rules in data(){}
(for example required: (value) => !!value || 'Required.')
-Add a checking method if areAllFieldAreFilledIn (add error attribut to the data() and a <span class="danger-alert">{{error}}) and make the method as follow in the method for posting vlab.
this.error = null
const areAllFieldsFilledIn = Object
  .keys(this.vlab)
  .every(key => !!this.vlab[key])
if (!areAllFieldsFilledIn) {
  this.error = 'Please fill in all the required fields.'
  return
}
Instead of making a class='error', we can make a class="danger-alert" and add a style to it.
Its very nice.

We can add the alt multi-line for having more \n for the placeholder and write with more spaces (depreciated use "v-textarea" instead)
The size max for parsing v-flex is xs14 (all the size of the window)

SLOT (very importante vue.js "zone de distribution de contenu")

**Basic slot
This work like a basic tag in HTML with content inside. We can put everything. But if there is no tag <slot> nothing comes up
The use of slot is very particular.
Actually we can give a name to the slot in the panel. And add this name to a particular tag in the main window to specify the place.

<slot name="hello"> // in the child window
  No slot content defined.
</slot>

<div slot="hello"> // in the parent window
  <h1> Hey </h1>
  <p> WHAT IS THIS ?</p>
</div>

We can set data to the child window by adding attribut to the <panel title="Songs"> and by adding into the script of the child :
props: [
  'title'
]

It really nice, because we can make a certain style and a certain obj for each window and add them if we want. Better structure project.

**Make a button @click nav to and specific id or Title
<v-btn
@click="navigateTo({
  name: 'vlab',
  params: {
    vlabTitle: vlab.title}
 })">
 method:
 navigateTo(route) {
   this.$router.push(route)
 } // As you see we only need one navigateTo for each route!!!!
