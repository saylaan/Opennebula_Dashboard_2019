<template>
  <v-layout column @mouseover="isMini()">
  <v-navigation-drawer
      :width="170"
      v-model="drawer.model"
      :permanent="drawer.type === 'permanent'"
      :temporary="drawer.type === 'temporary'"
      :clipped="drawer.clipped"
      :floating="drawer.floating"
      :mini-variant="drawer.mini"
      absolute
      overflow
      app
      :dark="dark"
  >
    <v-list>
      <v-list-tile v-if="isUserLoggedIn && !admin" class="mt-3" title="test" @click="navToDashboard({name: 'dashboard'})"
      :class="active.one">
        <v-list-tile-action>
          <v-icon x-large>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="admin || (isUserLoggedIn && nbvlab > 1)" class="mt-2" @click="navToVlab({name: 'vlabs'})"
      :class="active.two">
        <v-list-tile-action>
          <v-icon x-large>settings_system_daydream</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Vlabs</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="mt-2" v-if="admin" @click="navToUser({name: 'users'})"
      :class="active.three">
        <v-list-tile-action>
          <v-icon x-large>people</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="mt-2" @click="navToSetting({name: 'settings'})"
      :class="active.four">
        <v-list-tile-action>
          <v-icon x-large>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-spacer></v-spacer>
      <v-list-tile v-if="!admin" class="info mt-5" @click="goToUrl('http://vlab.aapp.al-enterprise.com/doku.php')">
        <v-list-tile-action>
          <v-icon x-large>help</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Help</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</v-layout>
</template>

<script>
import Swal from 'sweetalert2'
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user", "isUserLoggedIn", "nbvlab", "admin", "dark", "active"])
  },
  props: {
    drawer: {
      type: Object,
      require: true
    }
  },
  methods: {
    async goToUrl(url) {
      window.open(url, '_blank')
    },
    isMini() {
      if (this.drawer.mini) {
        this.drawer.mini = false
      }
    },
    navToDashboard(route) {
      this.$store.dispatch('setActive', 'one')
      this.$router.push(route);
    },
    navToVlab(route) {
      this.$store.dispatch('setActive', 'two')
      this.$router.push(route);
    },
    navToUser(route) {
      this.$store.dispatch('setActive', 'three')
      this.$router.push(route);
    },
    navToSetting(route) {
      this.$store.dispatch('setActive', 'four')
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>

</style>
