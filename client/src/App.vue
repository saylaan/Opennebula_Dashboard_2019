<template>
<v-app id="sandbox">
    <navbar v-if="isUserLoggedIn" v-bind:drawer="drawer"/>
    <toolbar v-bind:drawer="drawer"/>
    <v-jumbotron :gradient="grad" style="height:100%; overflow:auto;" @click="isMini()">
    <v-content>
      <v-container fluid>
        <router-view v:bind:drawer="drawer"></router-view>
      </v-container>
    </v-content>
    </v-jumbotron>
    <v-footer :dark="dark" :inset="footer.inset" app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from "@/components/Nav/Toolbar.vue";
import Navbar from "@/components/Nav/NavBar.vue";
import { mapState } from "vuex";
import UserService from "@/services/User/UserService";

export default {
  data() {
    return {
      hover: false,
      drawer: {
        model: null,
        type: 'permanent',
        clipped: false,
        floating: true,
        mini: true
      },
      footer: {
        inset: true
      }
    }
  },
  methods: {
    isMini() {
      if (!this.drawer.mini) {
        this.drawer.mini = true
      }
    }
  },
  components: {
    Toolbar,
    Navbar
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user", "admin", "grad", "dark"])
  }
}
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

.active {
  background: green;
}

.v-footer {
  opacity: 0.7
}

</style>
