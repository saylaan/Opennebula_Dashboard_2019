<template>
    <v-toolbar fixed class="purple darken-2" dark>
        <router-link to="/"><img src="../assets/LogoALE.png" aspect-ratio="0.2"></router-link>
      <v-toolbar-title class="mr-1">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark
         @click="navToMessageFAQ({name: 'messageFAQ'})">
           <v-icon x-large color="purple darken-5">email</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn flat dark
          @click="navToSignIn({name: 'signin'})">
          Sign in
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn flat dark
          @click="navToRegister({name: 'register'})">
          Register
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
    navToHome (route) {
      this.$router.push(route)
    }
  }
}
</script>

SandboxALE-AAPP_2019

<style scoped>
</style>
