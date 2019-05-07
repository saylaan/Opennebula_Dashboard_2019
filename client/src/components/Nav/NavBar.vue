<template>
  <v-navigation-drawer
    v-if="isUserLoggedIn"
    v-model="main.primaryDrawer.model"
    :clipped="main.primaryDrawer.clipped"
    :mini-variant="main.primaryDrawer.mini"
    fixed
    overflow
    app
    :dark="dark"
  >
    <v-list>
      <v-list-tile class="accent" @click="navTo({name: 'settings'})">
        <v-list-tile-avatar>
          <img src="https://via.placeholder.com/150">
        </v-list-tile-avatar>
        <v-list-tile-title>{{userview.lastname}} {{userview.firstname}}</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
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
      <br>
      <br>
      <v-list-tile v-if="!admin" class="info" href="http://vlab.aapp.al-enterprise.com/doku.php">
        <v-list-tile-action>
          <v-icon x-large>help</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Help</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService";

export default {
  data() {
    return {
      userview: null
    };
  },
  computed: {
    ...mapState(["user", "isUserLoggedIn", "admin", "dark"])
  },
  props: {
    main: {
      type: Object,
      require: true
    }
  },
  methods: {
    navTo(route) {
      this.$router.push(route);
    }
  },
  async mounted() {
    try {
      this.userview = (await UserService.getUser(this.user.id)).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
</style>
