<template>
  <v-app :dark="main.dark">
    <nav-bar v-if="isUserLoggedIn" v-bind:main="main"/>
    <toolbar v-bind:main="main"/>
    <v-content>
      <v-container fluid>
        <router-view v:bind:main="main"></router-view>
      </v-container>
    </v-content>
    <v-footer :inset="main.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from "@/components/Nav/Toolbar.vue";
import NavBar from "@/components/Nav/NavBar.vue";
import { mapState } from "vuex";

export default {
  data: () => ({
    main: {
      dark: true,
      inset: true,
      drawers: ["Default (no property)"],
      primaryDrawer: {
        model: null,
        type: "default (no property)",
        clipped: false
      }
    }
  }),
  name: "App",
  components: {
    Toolbar,
    NavBar
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
