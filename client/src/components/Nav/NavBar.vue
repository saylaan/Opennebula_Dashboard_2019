<template>
  <v-layout @mouseover="isMini()">
  <v-navigation-drawer 
      :width="170"
      v-model="drawer.model"
      :permanent="drawer.type === 'permanent'"
      :clipped="drawer.clipped"
      :floating="drawer.floating"
      :mini-variant="drawer.mini"
      overflow
      app
      :dark="dark"
  >
    <v-list>
      <v-list-item v-if="isUserLoggedIn && !admin" class="mt-3" title="test" @click="navToDashboard({name: 'dashboard'})"
      :class="active.one">
        <v-list-item-action>
          <v-icon>dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="admin || (isUserLoggedIn && nbvlab > 1)" class="mt-2" @click="navToVlab({name: 'vlabs'})"
      :class="active.two">
        <v-list-item-action>
          <v-icon>settings_system_daydream</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Vlabs</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="mt-2" v-if="admin" @click="navToUser({name: 'users'})"
      :class="active.three">
        <v-list-item-action>
          <v-icon>people</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="mt-2" @click="navToSetting({name: 'settings'})"
      :class="active.four">
        <v-list-item-action>
          <v-icon>settings</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-list-item v-if="!admin" class="accent mt-5" @click="goToUrl('http://vlab.aapp.al-enterprise.com/doku.php')">
        <v-list-item-action>
          <v-icon x-large>help</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
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
