<template>
  <v-toolbar
    :dark="dark"
    :clipped-left="main.primaryDrawer.clipped"
    :mini="main.primaryDrawer.mini"
    app
    fixed
  >
    <img
      src="../../assets/LogoALE.png"
      v-if="main.primaryDrawer.type !== 'permanent'"
      @click.stop="main.primaryDrawer.model = !main.primaryDrawer.model"
      aspect-ratio="0.1"
      @click="mainNav({name: 'home'})"
    >
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!admin">
      <v-btn flat :to="{name: 'message'}">
        <v-icon grey x-large>email</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn v-if="!isUserLoggedIn" flat :to="{name: 'signin'}">Sign in</v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn v-if="!isUserLoggedIn" flat :to="{name: 'register'}">Register</v-btn>
      <v-btn v-if="isUserLoggedIn" flat @click="logout">Log out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user", "isUserLoggedIn", "dark", "admin"])
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setDark", false);
      this.$store.dispatch("setGrad", "to top right, #5D29A9, #CBC8D0");
      this.$router.push({
        name: "home"
      });
    },
    mainNav(route) {
      if (!this.isUserLoggedIn) {
        this.$router.push(route);
      }
    }
  },
  props: {
    main: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.v-toolbar {
  opacity: 0.9;
}
</style>
