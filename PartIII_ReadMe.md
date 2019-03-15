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
