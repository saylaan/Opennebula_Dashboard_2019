<template>
  <v-layout wrap>
    <v-flex xs6 offset-xs3 v-if="!$store.state.isUserLoggedIn">
      <panel title="Register">
        <form name="sandbox-form" autocomplete="off">
          <v-text-field
            label="Company name"
            type="name"
            v-model="companyname">
          </v-text-field>
          <br>
          <v-text-field
            label="First name"
            type="name"
            v-model="firstname">
          </v-text-field>
          <br>
          <v-text-field
            label="Last name"
            type="nane"
            v-model="lastname">
          </v-text-field>
          <br>
          <v-text-field
            label="Email"
            type="name"
            v-model="email"></v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password">
          </v-text-field>
          <br>
          <v-select
            :items="items"
            label="Purpose, needs of the portal"
            v-model="need"
            outline
          ></v-select>
          <br>
          <div class="danger-alert" v-html="error"></div>
          <v-btn class="blue-grey lighten-3" @click="register">Register</v-btn>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  data() {
    return {
      items: [
        'enterprise', 'testing', 'personnal'
      ],
      companyname: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      need: "",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          companyname: this.companyname,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          need: this.need
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({
          name: "dashboard"
        });
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
