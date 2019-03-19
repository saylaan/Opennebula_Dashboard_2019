# SandboxALE-AAPP_2019
Create an webAAP for managing OpenNebula VMs

Inputs & controls : text fields -> <v-text-field/>

In App.vue : there is the style put globally
--> if you take a class from the F12 make sur it not a global one. (Inspect the element and find the class "easy")

--> make a header vue
create component header + add component to script in App.vue and import it + add <page-header/>
--> In app.vue : the default template should look like this :
<v-app>
  <page-header/>
  <main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </main>
</v-app>

=> YOU MUST WRAP EVERYTHING IN v-app
When we use v-app we can then change a color dark to white by adding dark to it (???) wtf
<!-- .v-input__slot { // underline placeholder
    border-bottom:  1px solid black;
} -->
=> Dont use global style ! It not really worth it

-> Redirection in vue.js
https://router.vuejs.org/guide/#html
<router-link to=".."></router-link>
or we can use a method to do so = no underline under the text :
@click="navToSignIn({name: 'signin'})" --> look faster
methods: {
  navToSignIn (route) {
    this.$router.push(route)
  },
--> Make the Authentification for login and redirection to home page user :
Same as the register. But inside server/src/controllers/AuthenticationController
do async login verification (Password / email)

For dropping all table while testing put : sequelize.sync({force: true}) -> Pay attention to that

--> Use of token to connect : (but we will use opennebula token)
npm install --save jsonwebtoken
add function to override in controllers/AuthenticationController and import config + jwt
Modify config/config.js with authentication
There is an error with the VIDEO.

--> Hash the password in the DB
npm install --save bcrypt-nodejs
npm install --save bluebird
add bcrypt and bluebird to models/User.js
add a new function in the module.exports (comparePassword) for using bcrypt and returning the hash password.
add a function for hash password with keeping the hooks (before : create / update / save)

There is lot of trouble with hash


--> Test the password and email adress use for the backend and try into the sign in

Not display the passwork in the front -> type="password"
For no autocomplete form :
<form
  name="sandbox-form"
  autocomplete="off">
and for specefic plaholder no-autocompletion do : autocomplete="new-password" for example.
It a good practice to wrap everything in a form


--> ACTION WITH LARGE VUE APP (WE CAN TIME TRAVEL THE APP)
If app get larger when components interact with other components. The best way is to use vuex. Parent use probe to give it to childreen. Keeping track of state. (Easier to follow the app)
sudo npm install --save vuex
sudo npm install --save vuex-router-sync (sync router to our vuex)
In main.js, import {sync}
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

sync(store, router)
+ create a ./store/store.js
and inside do:
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({ // for keeping tracking of state
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false // can make a control for the user is he's loged in (for exemple for hidding component in the nav bar)
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})

So we got state / mutation (same method as action but with a state) and actions (event name "commit or Async call")
WHen we login we can use to token to keep track of the user by doing by adding this to the method in the component async
this.$store.dispatch('setToken', response.data.token)
this.$store.dispatch('setUser', response.data.user)

Don't forget to use vue dev tool on the browser. Really nice to use
And add store, into the main.js at new Vue({})

For hidding component when the user is loged in do :
v-if="%store.state.isUserLoggedIn"
