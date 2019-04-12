<template>
  <v-layout wrap>
    <v-flex xs6 offset-xs3 v-if="!$store.state.isUserLoggedIn">
      <panel title="Sign in">
        <form name="sandbox-form" autocomplete="off">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
          <br>
          <div class="danger-alert" v-html="error"/>
          <v-btn class="grey darken-1" @click="signin">Sign in</v-btn>
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
      email: "",
      password: "",
      error: null
    };
  },
  props: {
    main: {
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
        this.$store.dispatch("setAdmin", response.data.user.admin)
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setDark", true);
        this.$store.dispatch("setGrad", 'to top right, #07090C, #232321');
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
