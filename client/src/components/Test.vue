<template>
  <div>
    <h1>Register</h1>

    <input type='email' name="email" v-model="email" placeholder="email"/><br>
    <input type='password' name="password" v-model="password" placeholder="password"/><br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
/* Import the service into the vue.js template */
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      /* Is like a placehold already fill in or not*/
      email: '',
      password: ''
    }
  },
  /* Watching if the value has changed or not */
  // watch: {
  //   email (value) {
  //     console.log('email has changed', value)
  //   },
  //   password (value) {
  //     console.log('password has changed', value)
  //   }
  // },
  /* Testing to make a timeout into the data placeholder */
  // mounted() {
  //   setTimeout(() => {
  //     this.email = 'Wrong email'
  //   }, 2000)
  // },
  methods: {
    async register () {
      await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
    /* Testing async register with print data into response*/
    // async register () {
    //   const response = await AuthenticationService.register({
    //     email: this.email,
    //     password: this.password
    //   })
    //   console.log(response.data)
    }
  }
}
</script>

<style scoped>
</style>
