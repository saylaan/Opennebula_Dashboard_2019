<template>
<v-app id="sandbox">
    <v-img v-if="!isUserLoggedIn" :src="require('@/assets/DSPP-banner.jpg')" v-bind:width="width" v-bind:height="height">
    <toolbar v-bind:drawer="drawer"/>
      <v-container fill-height fluid>
        <router-view v:bind:drawer="drawer"></router-view>
      </v-container>
    <v-footer :dark="dark" :inset="footer.inset" app>
      <span class="nonePhone px-3">&copy; Copyright {{new Date().getFullYear()}} The Alcatel-Lucent name and logo are trademarks of Nokia used under license by ALE.</span>
    </v-footer>
    </v-img>
    <v-img v-if="isUserLoggedIn" @click="isMini()" :gradiant="grad" v-bind:width="width" v-bind:height="height">
    <navbar v-if="isUserLoggedIn" v-bind:drawer="drawer"/>
    <toolbar v-bind:drawer="drawer"/>
    <v-content>
      <v-container fluid>
        <router-view v:bind:drawer="drawer"></router-view>
      </v-container>
    </v-content>
    <v-footer app :dark="dark" :inset="footer.inset">
      <span class="nonePhone px-3">&copy; Copyright {{new Date().getFullYear()}} The Alcatel-Lucent name and logo are trademarks of Nokia used under license by ALE.</span>
    </v-footer>
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
      height: window.innerHeight,
      width: window.innerWidth,
      hover: false,
      drawer: {
        model: null,
        type: 'permanent',
        clipped: true,
        floating: true,
        mini: true
      },
      footer: {
        inset: true
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    handleResize: function() {
      this.height = window.innerHeight
      this.width = window.innerWidth
    },
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
  background: grey;
}

.danger-alert {
  font-size: 18px !important;
  color: red;
}

.v-footer {
  opacity: 0.7
}

table.v-table thead th {
  font-size: 18px !important;
}
table.v-table tbody td {
  font-size: 16px !important;
}

@media screen and (max-width: 720px) {
  .nonePhone {
    display: none !important;
  }
}

</style>
