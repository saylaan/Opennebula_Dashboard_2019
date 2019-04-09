# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs

**Show all the Vlab link to User
--> Do the front (component / service)
-Do a new component name VlabsUsers (import, add in components, create the file within the default template, put the tag html <vlabs-users \>)
-Fill the new template (<panel title=""\> + <v-data-table\>)
-add async mounted () to have data on startup page. (if userLoggedIn with a getVlabUser(userId))
-add computed: for ...mapState() to have shortcut for param in store
-import {mapState} from 'vuex'
--> Modify the Back (controller)
-The GetVlabUsers need to be modify to accept only of UserId is pass in. But it's necessary to take VlabId because of other request that need it. This point is hard. (Use tip to make sur to understand 'where' / 'model' / 'map'). + use of _extend ('lodash')
-> Need to modify the VlabData do be able to make delete and add with the request modify (because it doesn't accept array)
1. watch: need to accept the vlabuser[0] only 
2. need to make sure the id for delete is working well

**Log part for Vlab admin (vlab log) and user (vlab log "credential") + internal message (admin)
--> Do the seed (models / /seed / .json)
-In index.js add the const in ../src/models, the const from the .json, the promise.all(...map(create..))
-Create the models into the db
--> Do the front (component / route / service)
-copy the VlabUser (change the name) + import into index.vue + create the service for it => need to do some modification because isn't totally the same as vlabuser.
-add the diffente functionnality to this service
--> Do the Back (route / controller)
-First do the route with the request we want (here post and index) + don't forget to import the controller
-Second do the controller with the request we again need, for the index we only need the userId (isLoggedIn), but do the same parsing as VlabUser and add _.uniq when res.send (if we want unique log) but better to use _.uniqBy
And for the post we only need to create (therefor, we don't need to check if the log is already inside the db)
+ change the pagination with 'createAt'

** passport authen for jwt (server side) this is really to make sur we use the token and not the id + it give us the possible do delete UserId.
npm install --save passport passport-jwt
1. add to app.js
2. do the passport.js
3. add 'isAuthenticated' to policy
4. make the route requirement for making thing
5. Change the controller
6. Change into /services/Api.js to make the check before request send(client)
7. Change de components.vue to make it work without the UserId

**Tips
-In vue the code is read one line after each other.(carefull where you place the initialisation of variable)
-Object in vue is pretty much like in .json
-We cant make some dynamic v-flex with a different state // really important for the admin / home
(:class="{
  xs12: isLogIn,
  xs6: isLogIn
  }")
-If you need to have two component next to each other in a row just put the size xs6 into the <v-flex\>
-<v-data-table> can have some attribut such as :headers="", :pagination.sync="" (sort), :items=""(depending on the headers) and more. We need to put this in the data () into <script>. It's use data as object to put inside the tab. 
[{
  text: '...',
  value: '...
}]
Then add a <template v-slot:items="props"><td class="">{{props.item....}}</td> // Pay attention to the value of the props.item who need to be the same as the value in the db.value = value
--> make static data-table or a dynamic with the backend request.
-To fix problem in the API such as findAll and findOne for xx requests without the same meaning (const {nameId, nameId} = req.query) do:
->const where = {
  NameId: nameId
}
if (Name2Id) {
  where.NameId = nameId
}
--> we can use a model for making a map with it such as Vlab:
const vlabusers = await getVlabUser.findAll({
where: where,
include: [
  {
    model: Vlab
  }
] // dont forget to import lodash
}).map(vlabuser => vlabuser.toJSON()).map(vlabuser => _.extend({}, vlabuser.Vlab, vlabuser))
res.send(vlabusers)