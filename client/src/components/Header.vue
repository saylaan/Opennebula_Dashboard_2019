<template>
    <v-toolbar fixed class="purple darken-2" dark>
        <router-link to="/"><img src="../assets/LogoALE.png" aspect-ratio="0.2" @click="navToHome"></router-link>
      <v-toolbar-title class="mr-1">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" flat dark
         @click="navToMessageFAQ({name: 'messageFAQ'})">
           <v-icon x-large color="purple darken-5">email</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" flat dark
          @click="navToSignIn({name: 'signin'})">
          Sign in
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" flat dark
          @click="navToRegister({name: 'register'})">
          Register
        </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn" flat dark
          @click="logout">
          Log out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navToSignIn (route) {
      this.$router.push(route)
    },
    navToRegister (route) {
      this.$router.push(route)
    },
    navToMessageFAQ (route) {
      this.$router.push(route)
    },
    navToHome () {
      this.$router.push({
        name: 'home'
      })
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

SandboxALE-AAPP_2019

<style scoped>
</style>
