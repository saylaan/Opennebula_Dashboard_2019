<template>
    <v-toolbar fixed class="purple darken-2" dark>
        <img src="../assets/LogoALE.png" aspect-ratio="0.2">
      <v-toolbar-title class="mr-1">
        <v-btn flat dark>
          <router-link to="/">Sandbox</router-link>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark>
         <router-link to="messageFAQ">
           <v-icon x-large color="purple darken-5">email</v-icon>
         </router-link>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn flat dark
          @click="navToRegister({name: 'register'})">
          Sign in
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn flat dark>
          <router-link to="register">Register</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navToRegister (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
</style>
