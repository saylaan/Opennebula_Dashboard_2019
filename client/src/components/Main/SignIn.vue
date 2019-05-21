<template>
  <v-layout justify-center>
    <v-flex elevation-24 xs6 v-if="!$store.state.isUserLoggedIn">
      <panel title="Sign in">
        <form name="sandbox-form" autocomplete="off">
          <v-text-field class="mt-5" label="Email" v-model="email" outline clearable>
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
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-icon>https</v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>
          <br>
          <div class="danger-alert" v-html="error"/>
          <v-layout justify-center>
          <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="signin">Sign in</v-btn>
          </v-layout>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/Authen/AuthenticationService";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  props: {
    drawer: {
      type: Object,
      require: true
    }
  },
  methods: {
    async signin() {
      try {
        const response = await AuthenticationService.signin({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setAdmin", response.data.user.admin);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setDark", true);
        this.$store.dispatch("setGrad", "to top right, #07090C, #232321");
        this.$router.push({
          name: "dashboard"
        });
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'You sign in with email : ',
          text: this.email,
          showConfirmButton: false,
          timer: 2000
        })
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>
