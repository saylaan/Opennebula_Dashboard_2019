<template>
    <v-layout wrap>
        <v-flex xs6 offset-xs3 v-if="!$store.state.isUserLoggedIn">
            <div class="white elevation-2">
                <v-toolbar class="purple lighten-1" flat dense dark>
                    <v-toolbar-title>Register</v-toolbar-title>
                </v-toolbar>
                <div class="pl-4 pr-4 pt-2 pb-2" dark>
                  <form
                    name="sandbox-form"
                    autocomplete="off">
                    <v-text-field label='Email' v-model="email"></v-text-field><br>
                    <v-text-field label='Password' type='password' v-model="password" autocomplete='new-password'></v-text-field><br>
                    <div class="error" v-html="error"/>
                    <v-btn class="purple" @click="register" dark>Register</v-btn>
                  </form>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
