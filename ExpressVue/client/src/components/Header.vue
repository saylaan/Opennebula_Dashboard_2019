<template>
  <v-toolbar fixed class="purple darken-2" dark>
    <router-link to="/">
      <img src="../assets/LogoALE.png"
        aspect-ratio="0.2"
        :to="{name: 'home'}">
    </router-link>
    <v-toolbar-title class="mr-1">
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat dark
      :to="{name: 'vlabs'}">
      Vlab
    </v-btn>
  </v-toolbar-items>
  <v-spacer></v-spacer>
  <v-toolbar-items>
    <v-btn v-if="!$store.state.isUserLoggedIn" flat dark
    :to="{name: 'messageFAQ'}">
    <v-icon x-large color="purple darken-5">email</v-icon>
  </v-btn>
</v-toolbar-items>
<v-toolbar-items>
  <v-btn v-if="!$store.state.isUserLoggedIn" flat dark
  :to="{name: 'signin'}">
  Sign in
</v-btn>
</v-toolbar-items>
<v-toolbar-items>
  <v-btn v-if="!$store.state.isUserLoggedIn" flat dark
  :to="{name: 'register'}">
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

<style scoped>
</style>
