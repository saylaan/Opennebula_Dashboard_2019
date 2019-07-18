<template>
<v-app id="sandbox">
    <v-img v-if="!isUserLoggedIn" :src="require('@/assets/DSPP-banner.jpg')" height="100%" width="100%">
    <div @click="isMini()">
    <toolbar v-bind:drawer="drawer"/>
    <v-content>
      <v-container fluid>
        <router-view v:bind:drawer="drawer"></router-view>
      </v-container>
    </v-content>
    <v-footer :dark="dark" :inset="footer.inset" app>
      <span class="px-3">&copy; Copyright {{new Date().getFullYear()}} The Alcatel-Lucent name and logo are trademarks of Nokia used under license by ALE.</span>
    </v-footer>
    </div>
    </v-img>
    <v-img v-if="isUserLoggedIn" :gradiant="grad" height="100%" width="100%">
    <div @click="isMini()">
    <navbar v-if="isUserLoggedIn" v-bind:drawer="drawer"/>
    <toolbar v-bind:drawer="drawer"/>
    <v-content>
      <v-container fluid>
        <router-view v:bind:drawer="drawer"></router-view>
      </v-container>
    </v-content>
    <v-footer :dark="dark" :inset="footer.inset" app>
      <span class="px-3">&copy; Copyright {{new Date().getFullYear()}} The Alcatel-Lucent name and logo are trademarks of Nokia used under license by ALE.</span>
    </v-footer>
    </div>
    </v-img>
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
        clipped: true,
        floating: true,
        mini: true,
        active: {
          one: null,
          two: null,
          three: null,
          four: null
        }
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
