# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs

**Tips
It's a good idea to rename the main component as Index.vue for making easier the research of main windows.
Let is for dynamic and Const for no change value

Global Component : (If there is to many occurence of a component)
-add it to main.js (import)
-Vue.component('panel', Panel)
-Remove import from every files

Instead to use a navigateTo, we only need to use the :to={obj} tag (no need a method for it)
--> but if we send a param its better to do a params method returning the data

Its better to use class="danger-alert for error" and give it our choose color

Redirected the log page into Vlab (better then home page)

If their is no value in a query but we want to see the error : console.log(smthg , query) = smthg + null

req.params : contains route parameters (in the path portion of the URL)
req.query :  contains the URL query parameter (after the ? in the URL)
req.body: holds parameters that are sent up from the client as part of a Post request

Creation of obj : { message: 'This is the message'}

To know : watch is permantly check where as mounted is only at startup of the page.

Computed: is for auto change value (calculation, incrementation...;)

**Search Bar in vuejs :
-Do a panel for the specific search (here VlabPanel) within:
*delete the mounted()
*add a watch such as in VlabSearchPanel (dont forget the async for handler)
*into the VlabService for the getAllVlabs, we can add a param to make it search only one.
-Do a panel for the Search bar (VlabSearchPanel) with a text field and a data () for "search" within:
*Add a watch attribut.
*Add a query dynamic with the watch for changing the url while searching
*We can add a auto fill in with preentering into the url.
-Into the back-end: (this part is hard)
* need to find a query that match with the search value into (req) and then let send a map with that key (error with it)

npm install --save lodash //optimise the speed for research
then import in the SearchPanel and use the function _.debounce as async function with 700ms reload

**Give data to the DB with an other function (cleaning process)
-folder seed into server with inside index.js and the filename.json who has data
-add the proper const for the model use by the db
-add the proper const for the .json and the bluebird module (const Promise)
-create for each value of the json file the data in the db
-populate de .json file as needed to get the first impression of what it should look like
--> For the Opennebula API XML-RPC. We should do it first like that (VMs / Vlabs / Users)

**Lets make foreign key with the code for linking users with data:
-Add a function 'associate' into the index.js inside /models
-Add a really different model with "belongsTo" with the function made before.
-Add the controller for it to find the query
-Add the route need for the query
-Add a delete and post request
--> In the front : (dont really understand all for the moment)
-add a new button with a method @click + v-if = $store.state.isUserLogged (take this exemple for admin). $store.state nest pas obligatoire
-import {mapState} from 'vuex'
-computed {
  ...mapState(['isUserLoggedIn']) --> this is like a define (for less char)
}
-make the service (when there is xx params just do params: params)
-make mounted() not a methods. (getVlabUser + find userId into the $store)
-add && to v-if with a data() change such as "vlabuser"
-add a post and delete method for changing the getVlabUser with the back-end (async is with await)

**Make loggin persistant even if reload of the page (easy):
npm install --save npm install vuex-persistedstate
-import to the store
-add plugins: [
  function()
]
