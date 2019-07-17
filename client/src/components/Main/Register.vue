<template>
  <v-layout class="mt-5" justify-center>
    <v-flex elevation-24 xs6 v-if="!$store.state.isUserLoggedIn">
      <panel title="Register">
        <form name="sandbox-form" autocomplete="off">
          <v-text-field class="mt-5" label="Company name" type="name" v-model="companyname" outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                The name of the company must be valid
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>domain</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field class="padding-input" label="First name" type="name" v-model="firstname" outline clearable>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>account_box</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field class="padding-input" label="Last name" type="nane" v-model="lastname" outline clearable>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>account_box</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field label="Username" type="name" v-model="username" outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                The username will be choose for accesing the vlab
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>account_box</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field label="Email" type="name" v-model="email" outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your email must be valid
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>email</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
            outline
            clearable
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Your password must contain at least 8 characters
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <v-textarea label="Purpose" type="purpose" v-model="purpose" outline clearable>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">help</v-icon>
                </template>
                Explain for what purpose you need a access to the portal
              </v-tooltip>
            </template>
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>notes</v-icon>
              </v-fade-transition>
            </template>
          </v-textarea>
          <br>
          <div class="g-reCAPTCHAR" data-sitekey="6LdXEqQUAAAAAL3oAttg0UnznP__DAzEHRmLxhHv"></div>
          <!-- <template>
            <vue-recaptcha sitekey="6LdXEqQUAAAAAL3oAttg0UnznP__DAzEHRmLxhHv">
              <v-btn>Click me</v-btn>
            </vue-recaptcha>
          </template> -->
          <div class="danger-alert" v-html="error"></div>
          <v-layout justify-center>
          <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="register">Register</v-btn>
          </v-layout>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/Authen/AuthenticationService";
import Swal from 'sweetalert2'
import VueRecaptcha from 'vue-recaptcha'

export default {
  data() {
    return {
      companyname: "",
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      purpose: "",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        await AuthenticationService.register({
          companyname: this.companyname,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          purpose: this.purpose,
          username: this.username
        });
        Swal.fire({
          type: 'success',
          title: 'Registration Successfull',
          text: 'You can logged in but you won\'t have access to any vlab'
        })
        this.$router.push({
          name: "home"
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  components: {
    VueRecaptcha
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
.padding-input {
  margin-left: 32px;
}
</style>
