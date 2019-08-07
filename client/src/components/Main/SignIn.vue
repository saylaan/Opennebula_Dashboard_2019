<template>
<v-container v-on:keyup.enter="signin">
  <v-layout align-center justify-center>
    <v-flex elevation-24 xs12 sm8 md6 v-if="!isUserLoggedIn">
      <panel title="Sign in">
        <form name="sandbox-form" autocomplete="on">
          <v-text-field class="mt-5" 
            label="Email" 
            v-model="email" 
            autocomplete="on"
            outline 
            clearable>
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
          <v-layout column justify-center align-center>
          <div class="danger-alert" v-html="error"/>
          <v-layout class="mt-2" justify-center align-center>
          <v-btn elevation-24 large class="grey darken-1 mb-4 font-weight-bold" @click="signin">Sign in</v-btn>
          </v-layout>
          </v-layout>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>
import { mapState } from "vuex";
import AuthenticationService from "@/services/Authen/AuthenticationService";
import VlabUserService from "@/services/Vlab/VlabUserService"
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
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin", "active"])
  },
  methods: {
    async signin() {
      try {
        const response = await AuthenticationService.signin({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setAdmin", response.data.user.admin);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setDark", true);
        this.$store.dispatch("setGrad", "to top right, #FFFFFF, #ECE9E6");
        if (!this.admin) {
          try {
            const vlabuser = await VlabUserService.index()
            this.$store.dispatch("setNbVlab", vlabuser.data.length)
            this.$store.dispatch("setActive", 'one')
            this.$router.push({
              name: "dashboard"
            });
          } catch (error) {
            console.log(error)
          }
        } else {
          this.$store.dispatch("setActive", "two")
          this.$router.push({
            name: "vlabs"
          });
        }
        // Swal.fire({
        //   position: 'top-end',
        //   type: 'success',
        //   title: 'You sign in with email : ',
        //   text: this.email,
        //   showConfirmButton: false,
        //   timer: 2000
        // })
      } catch (error) {
        this.error = error.response.data.error;
        // Swal.fire({
        //   position: 'top-end',
        //   type: 'error',
        //   title: 'Wrong login, please retry',
        //   text: this.email,
        //   showConfirmButton: false,
        //   timer: 2000
        // })
      }
      // TODO : MAKE THIS DRAWER ACTIVE IN VUEX STORE
    }
  }
};
</script>

<style scoped>
.danger-alert {
  color: red;
}
</style>
