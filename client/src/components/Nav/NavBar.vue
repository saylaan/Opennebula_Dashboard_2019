<template>
  <div @mouseover="isMini()">
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
      <v-list-tile class="mt-3" title="test" @click="navToDashboard({name: 'dashboard'})"
      :class="drawer.active.one">
        <v-list-tile-action>
          <v-icon x-large>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="mt-2" @click="navToVlab({name: 'vlabs'})"
      :class="drawer.active.two">
        <v-list-tile-action>
          <v-icon x-large>settings_system_daydream</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Vlabs</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="mt-2" v-if="admin" @click="navToUser({name: 'users'})"
      :class="drawer.active.three">
        <v-list-tile-action>
          <v-icon x-large>people</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Users</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="mt-2" @click="navToSetting({name: 'settings'})"
      :class="drawer.active.four">
        <v-list-tile-action>
          <v-icon x-large>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="!admin" class="info mt-5" href="http://vlab.aapp.al-enterprise.com/doku.php">
        <v-list-tile-action>
          <v-icon x-large>help</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Help</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
import { mapState } from "vuex";
import UserService from "@/services/User/UserService";

export default {
  computed: {
    ...mapState(["user", "isUserLoggedIn", "admin", "dark"])
  },
  props: {
    drawer: {
      type: Object,
      require: true
    }
  },
  watch: {
    async getUserView() {
      try {
        this.userview = (await UserService.getUser(this.user.id)).data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    isMini() {
      if (this.drawer.mini) {
        this.drawer.mini = false
      }
    },
    navToDashboard(route) {
      this.drawer.active.one = "primary"
      this.drawer.active.two = null
      this.drawer.active.three = null
      this.drawer.active.four = null
      this.$router.push(route);
    },
    navToVlab(route) {
      this.drawer.active.one = null
      this.drawer.active.two = "primary"
      this.drawer.active.three = null
      this.drawer.active.four = null
      this.$router.push(route);
    },
    navToUser(route) {
      this.drawer.active.one = null
      this.drawer.active.two = null
      this.drawer.active.three = "primary"
      this.drawer.active.four = null
      this.$router.push(route);
    },
    navToSetting(route) {
      this.drawer.active.one = null
      this.drawer.active.two = null
      this.drawer.active.three = null
      this.drawer.active.four = "primary"
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
