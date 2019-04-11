<template>
  <v-navigation-drawer
    v-if="isUserLoggedIn"
    v-model="main.primaryDrawer.model"
    :clipped="main.primaryDrawer.clipped"
    fixed
    overflow
    app
  >
    <v-list>
      <v-list-tile @click="navTo({name: 'settings'})">
        <v-list-tile-avatar><img src="https://via.placeholder.com/150"></v-list-tile-avatar>
        <v-list-tile-title>User X</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-list>
      <v-list-tile @click="navTo({name: 'dashboard'})">
        <v-list-tile-action>
          <v-icon x-large>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="navTo({name: 'vlabs'})">
        <v-list-tile-action>
          <v-icon x-large>settings_system_daydream</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Vlabs</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="admin" @click="navTo({name: 'users'})">
        <v-list-tile-action>
          <v-icon x-large>people</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="navTo({name: 'settings'})">
        <v-list-tile-action>
          <v-icon x-large>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user", "isUserLoggedIn", "admin"])
  },
  props: {
    main: {
      type: Object,
      require: true
    }
  },
  methods: {
    navTo(route) {
      this.$router.push(route)
    }
  }
};
</script>

<style scoped>
</style>
